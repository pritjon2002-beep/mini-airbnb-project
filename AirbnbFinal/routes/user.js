const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { isLoggedIn, saveRedirectUrl } = require("../middleware.js");
const userController = require("../controller/users.js");
//singup route
//get route
router.get("/signup", userController.renderSignupForm);

//post route
router.post("/signup", wrapAsync(userController.signup));

//login route
//get route
router.get("/login", userController.renderLoginForm);

//post route
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  wrapAsync(userController.login),
);

//user logout

router.get("/logout", isLoggedIn, userController.logout);

module.exports = router;
