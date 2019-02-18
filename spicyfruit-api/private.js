const privateFunctions = require("./privateFunctions"); // includes all the private api functions
const asyncWrapper = require("./asyncWrapper"); // async wrapper for express
const express = require("express"); // web application framework used for api routes

// global objects
const router = express.Router();

// router middleware(gets called for every request to the router)
router.use(asyncWrapper(privateFunctions.verifyClient));

// get request for '/'
router.get("/", asyncWrapper(privateFunctions.getIndex));

router.get("/signUp", asyncWrapper(privateFunctions.signUp));
router.get("/signIn", asyncWrapper(privateFunctions.signIn));
router.get("/forgotPassword", asyncWrapper(privateFunctions.forgotPassword));
router.get("/editProfile", asyncWrapper(privateFunctions.editProfile));
router.get("/accountVerified", asyncWrapper(privateFunctions.accountVerified));

// export the private router
module.exports = router;
