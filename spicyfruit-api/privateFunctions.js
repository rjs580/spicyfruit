const constants = require("./constants"); // contains all the application constants
const htmlStrings = require("./htmlStrings"); // all the constant html strings
const url = require("url"); // parse url parameters
const pool = require("./database"); // mysql connection pool
const {OAuth2Client} = require("google-auth-library"); // validate google users
const bcrypt = require("bcrypt"); // encrypt/decrypt passwords
const dns = require("dns"); // dns lookup
const util = require("util"); // used to promisify the sql queries
const mysql = require("mysql");

const googleClient = new OAuth2Client(constants.CLIENT_ID); // google client validator

const CODE = {error: -1, success: 0};
const BOOL = {true: 1, false: 0};
const UserType = {SocialUser: 0, Regular: 1, ForgotPassword: 2};

function encodeResponse(code, message) {
  return {code: code, message: message};
}

function createAuthUser(request) {
  return new Promise((resolve, reject) => {
    try {
      let urlParts = url.parse(request.url, true);
      let params = urlParts.query;
      let authUser = {
        userType: parseInt(params.type),
        email: params.email,
        nickName: params.name,
        password: params.password,
        tokenId: params.tokenId,
        id: params.id
      };

      resolve(authUser);
    } catch (err) {
      reject(err);
    }
  });
}

function createEditUser(request) {
  return new Promise((resolve, reject) => {
    try {
      let urlParts = url.parse(request.url, true);
      let params = urlParts.query;
      let editUser = {
        email: params.email,
        id: params.id
      };

      if (parseInt(params.nickName) !== -1) {
        editUser.nickName = params.nickName;
      }

      if (parseInt(params.profilePic) !== -1) {
        editUser.profilePic = params.profilePic;
      }

      resolve(editUser);
    } catch (err) {
      reject(err);
    }
  });
}

async function verifyGoogleUser(user) {
  let ticket = await googleClient.verifyIdToken({
    idToken: user.tokenId,
    audience: constants.CLIENT_ID
  });
  let payload = ticket.getPayload();
  let payloadData = {
    userId: payload["sub"],
    aud: payload["aud"], // should equal client_id
    iss: payload["iss"] // accounts.google.com || https://accounts.google.com
  };

  return new Promise((resolve, reject) => {
    try {
      if (payloadData.aud === constants.CLIENT_ID &&
        (payloadData.iss === "accounts.google.com" || payloadData.iss === "https://accounts.google.com") &&
        payloadData.userId === user.id) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (err) {
      reject(err);
    }
  });
}

function createUserFromRow(user) {
  return {
    id: user.id,
    email: user.email,
    password: user.password,
    nickName: user.nickName,
    isBanned: user.isBanned,
    createdOn: user.createdOn,
    lastLogin: user.lastLogin
  };
}

function createAccountsUser(dbUser, dbUserAccount) {
  return {
    nickName: dbUser.nickName,
    userEmail: dbUser.email,
    userID: dbUserAccount.userID,
    profilePic: dbUserAccount.profilePic,
    isVerified: dbUserAccount.isVerified,
    isDeveloper: dbUserAccount.isDeveloper,
    isModerator: dbUserAccount.isModerator,
    lastLogin: dbUser.lastLogin
  };
}

let lookupPromise = util.promisify(dns.reverse);

module.exports = {
  // verify the client by checking the IP address against the allowed IP addresses
  verifyClient: async function (request, response, next) {
    let requestIP = request.get('x-real-ip') ? request.get('x-real-ip') : request.connection.remoteAddress;

    let hostnameAccepted = false;
    let t = await lookupPromise(requestIP);
    if (t && t.length > 0) hostnameAccepted = constants.ALLOWED_HOSTNAMES_PRIVATEAPI.includes(t[0]);

    if (constants.ALLOWED_IP_PRIVATEAPI.includes(requestIP) || hostnameAccepted === true) {
      next();
    } else {
      console.error("Blocked IP: " + requestIP);
      response.status(403);
      response.send(htmlStrings.FORBIDDEN);
    }
  },

  // get request for '/'
  getIndex: async function (request, response) {
    response.send(htmlStrings.PRIVATE_INDEX);
  },

  // get request for signUp
  signUp: async function (request, response) {
    let user = await createAuthUser(request);
    let dbUserRow = await pool.query(`SELECT COUNT(*) AS userRecord FROM users WHERE email = ?`, [user.email]);

    if (dbUserRow[0].userRecord !== 0) {
      response.json(encodeResponse(CODE.error, "User already exists"));
    } else {
      if (user.userType !== UserType.SocialUser && user.userType !== UserType.Regular) {
        response.json(encodeResponse(CODE.error, "Wrong user type or not enough data is provided"));
      } else {
        let isValidUser = true;
        if (user.userType === UserType.SocialUser) {
          isValidUser = await verifyGoogleUser(user);
        }

        if (isValidUser === false) {
          response.json(encodeResponse(CODE.error, "User is not a valid google user"));
        } else {
          let hashedPassword = await bcrypt.hash((user.userType === UserType.SocialUser) ? user.id : user.password, constants.SALT_ROUNDS);
          let dbValues = [[user.email, hashedPassword, user.nickName]];
          let dbInsertResult = await pool.query(`INSERT INTO users (email, password, nickName) VALUES ?`, [dbValues]);

          if ("affectedRows" in dbInsertResult && dbInsertResult.affectedRows !== 1) {
            response.json(encodeResponse(CODE.error, "Database error in creating the user"));
          } else {
            dbUserRow = await pool.query(`SELECT COUNT(*) AS userRecord FROM users WHERE email = ?`, [user.email]);

            if (dbUserRow[0].userRecord !== 1) {
              response.json(CODE.error, "Database error in checking the creation of the user");
            } else {
              dbInsertResult = await pool.query(`INSERT INTO accounts (userID) VALUES ((SELECT id FROM users WHERE email = ?))`, [user.email]);
              if ("affectedRows" in dbInsertResult && dbInsertResult.affectedRows !== 1) {
                response.json(CODE.error, "Database error in creating the user account");
              } else {
                let dbUserAccountRow = await pool.query(`SELECT * FROM accounts WHERE userID = (SELECT id FROM users WHERE email = ?)`, [user.email]);
                if (dbUserAccountRow.length <= 0) {
                  response.json(encodeResponse(CODE.error, "Database error retrieving user account"));
                } else {
                  dbUserRow = await pool.query(`SELECT * FROM users WHERE email = ?`, [user.email]);
                  if (constants.DEVELOPMENT_MODE === true) {
                    if (constants.ALLOWED_DEVELOPERS_INMODE.includes(user.email)) {
                      response.json(encodeResponse(CODE.success, createAccountsUser(dbUserRow[0], dbUserAccountRow[0])));
                    } else {
                      response.json(encodeResponse(CODE.error, "Site is under development, please try again later"));
                    }
                  } else {
                    response.json(encodeResponse(CODE.success, createAccountsUser(dbUserRow[0], dbUserAccountRow[0])));
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  // get request for signIn
  signIn: async function (request, response) {
    let user = await createAuthUser(request);
    let dbUserRow = await pool.query(`SELECT * FROM users WHERE email = ?`, [user.email]);

    if (dbUserRow.length !== 1) {
      response.json(encodeResponse(CODE.error, "User record was not found"));
    } else {
      let dbUser = createUserFromRow(dbUserRow[0]);
      if (dbUser.isBanned === BOOL.true) {
        response.json(encodeResponse(CODE.error, "User has been banned"));
      } else {
        let isValidUser = true;
        if (user.userType === UserType.SocialUser) {
          isValidUser = await verifyGoogleUser(user);
        }

        if (isValidUser === false) {
          response.json(encodeResponse(CODE.error, "User is not a valid google user"));
        } else {
          let isPasswordCorrect = await bcrypt.compare((user.userType === UserType.SocialUser) ? user.id : user.password, dbUser.password);

          if (isPasswordCorrect === false) {
            response.json(encodeResponse(CODE.error, "User password is incorrect"));
          } else {
            let dbUserAccountRow = await pool.query(`SELECT * FROM accounts WHERE userID = (SELECT id FROM users WHERE email = ?)`, [dbUser.email]);
            if (dbUserAccountRow.length <= 0) {
              response.json(encodeResponse(CODE.error, "Database error retrieving user account"));
            } else {
              await pool.query(`UPDATE users SET lastLogin = NOW() WHERE id = ?`, [dbUser.id]);
              dbUserRow = await pool.query(`SELECT * FROM users WHERE email = ?`, [user.email]);
              if (constants.DEVELOPMENT_MODE === true) {
                if (constants.ALLOWED_DEVELOPERS_INMODE.includes(user.email)) {
                  response.json(encodeResponse(CODE.success, createAccountsUser(dbUserRow[0], dbUserAccountRow[0])));
                } else {
                  response.json(encodeResponse(CODE.error, "Site is under development, please try again later"));
                }
              } else {
                response.json(encodeResponse(CODE.success, createAccountsUser(dbUserRow[0], dbUserAccountRow[0])));
              }
            }
          }
        }
      }
    }
  },

  // get request for forgotPassword
  forgotPassword: async function (request, response) {

  },

  // edit profile
  editProfile: async function (request, response) {
    let user = await createEditUser(request);

    if ("nickName" in user) {
      await pool.query(`UPDATE users SET nickName = ${mysql.escape(user.nickName)} WHERE id = ${mysql.escape(user.id)} AND email = ${mysql.escape(user.email)}`);
    }

    if ("profilePic" in user) {
      await pool.query(`UPDATE accounts SET profilePic = ${mysql.escape(user.profilePic)} WHERE userID = (SELECT id FROM users WHERE email = ${mysql.escape(user.email)} AND id = ${mysql.escape(user.id)})`);
    }

    let dbUserAccountRow = await pool.query(`SELECT * FROM accounts WHERE userID = (SELECT id FROM users WHERE email = ?)`, [user.email]);
    if (dbUserAccountRow.length <= 0) {
      response.json(encodeResponse(CODE.error, "Database error retrieving user account"));
    } else {
      let dbUserRow = await pool.query(`SELECT * FROM users WHERE email = ?`, [user.email]);
      response.json(encodeResponse(CODE.success, createAccountsUser(dbUserRow[0], dbUserAccountRow[0])));
    }
  },

  // account has been verified
  accountVerified: async function (request, response) {
    let user = await createEditUser(request);
    await pool.query(`UPDATE accounts SET isVerified = ${mysql.escape(1)} WHERE userID = (SELECT id FROM users WHERE email = ${mysql.escape(user.email)} AND id = ${mysql.escape(user.id)})`);
    response.json(encodeResponse(CODE.success, "Verified"));
  }
};
