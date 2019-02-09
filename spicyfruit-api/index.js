const constants = require("./constants"); // contains all the application constants
const htmlStrings = require("./htmlStrings"); // all the constant html strings
const asyncWrapper = require("./asyncWrapper"); // async wrapper for express
const express = require("express"); // web application framework used for api routes
const os = require("os"); // used to get the IP Address assigned by the router
const privateRouter = require("./private"); // private part of the api
const publicRouter = require("./public"); // public part of the api

// global objects
const app = express(); // express application

// get request for '/'
app.get("/", asyncWrapper(async (request, response) => {
  response.send(htmlStrings.INDEX);
}));

// apply api routers
app.use("/private", privateRouter);
app.use("/public", publicRouter);

// app error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.send(htmlStrings.INTERNAL_ERROR);
});

// get all request if they are not fulfilled
app.get("*", asyncWrapper(async (request, response) => {
  // showing a forbidden page leads attackers down the wrong path rather than letting them know
  // that no page has been found
  response.status(403);
  response.send(htmlStrings.FORBIDDEN);
}));

// start listening on the defined PORT
app.listen(constants.PORT, '0.0.0.0', function() {
  let address = "";
  let interfaces = os.networkInterfaces();
  for(let interfaceName in interfaces) {
    let interf = interfaces[interfaceName];

    for(let i = 0; i < interf.length; i++) {
      let alias = interf[i];
      if(alias.family === "IPv4" && alias.address !== "127.0.0.1" && !alias.internal) {
        address = alias.address;
        break;
      }
    }

    if(address !== "") break;
  }

  console.log(`Listening on http://localhost:${constants.PORT} or http://${address}:${constants.PORT}`);
});
