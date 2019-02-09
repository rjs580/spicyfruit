const constants = require("./constants"); // contains all the application constants
const util = require("util"); // used to promisify the sql queries
const mysql = require("mysql"); // used to connect to the mysql server
const pool = mysql.createPool({
  connectionLimit: constants.DB.CONNECTION_LIMIT,
  host: constants.DB.HOST,
  user: constants.DB.USER,
  password: constants.DB.PASSWORD,
  database: constants.DB.DATABASE,
  dateStrings: true
});

// check database for errors
pool.getConnection((error, connection) => {
  if(error) {
    if(error.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Connection with the database was closed.");
    }

    if(error.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    }

    if(error.code === "ECONNREFUSED") {
      console.error("Connection with the database was refused.");
    }
  }

  if(connection) connection.release();
});

// promisify the pool query (async/await)
pool.query = util.promisify(pool.query);

// export the pool to take database requests
module.exports = pool;
