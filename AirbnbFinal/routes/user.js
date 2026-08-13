const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");

//singup route
//get route
router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

//post route
router.post("/signup", async (req, res) => {
  let { username, email, password } = req.body;
  let newUser = new User({
    username,
    email,
  });
  let registeredUser = await User.register(newUser, password);
  console.log(registeredUser);
  req.flash("success", "SignUp Successfully , Welcome to Listings");
  res.redirect("/listings");
});

module.exports = router;
