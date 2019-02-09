const constants = require("./constants"); // contains all the application constants
const htmlStrings = require("./htmlStrings"); // all the constant html strings
const asyncWrapper = require("./asyncWrapper"); // async wrapper for express
const express = require("express"); // web application framework used for api routes

// global objects
const router = express.Router();

// get request for '/'
router.get("/", asyncWrapper( async (request, response) => {
  response.send(htmlStrings.PUBLIC_INDEX);
}));

// export the private router
module.exports = router;