const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { isLoggedIn, saveRedirectUrl } = require("../middleware.js");

//singup route
//get route
router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

//post route
router.post(
  "/signup",
  wrapAsync(async (req, res, next) => {
    try {
      let { username, email, password } = req.body;
      let newUser = new User({
        username,
        email,
      });
      let registeredUser = await User.register(newUser, password);
      console.log(registeredUser);

      req.login(registeredUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash(
          "success",
          "SignUp and Login Successfully , Welcome to Listings",
        );
        res.redirect("/listings");
      });
    } catch (error) {
      req.flash("error", "Username Already Used");
      res.redirect("/signup");
    }
  }),
);

//login route
//get route
router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

//post route
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  wrapAsync(async (req, res) => {
    req.flash("success", "logged In Successfully");
    redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  }),
);

//user logout

router.get("/logout", isLoggedIn, (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logout Successfully");
    res.redirect("/listings");
  });
});

module.exports = router;
