const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { isLoggedIn, saveRedirectUrl } = require("../middleware.js");
const userController = require("../controller/users.js");
const bookingController = require("../controller/booking.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//singup route
router
  .route("/signup")
  //get route
  .get(userController.renderSignupForm)
  //post route
  .post(wrapAsync(userController.signup));

//login route
router
  //get route
  .route("/login")
  .get(userController.renderLoginForm)
  //post route
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    wrapAsync(userController.login),
  );

//Google login
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

//Google callback
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", "Logged in with Google successfully");
    res.redirect("/listings");
  },
);

//user logout

router.get("/logout", userController.logout);

//my booking
router.get("/mybooking", isLoggedIn, wrapAsync(bookingController.myBookings));

//wishlist route
router.get("/wishlist", isLoggedIn, wrapAsync(userController.showWishlist));

//profile route
router.get("/profile", isLoggedIn, wrapAsync(userController.showProfile));

// profile pic
router.get("/profile/edit", isLoggedIn, userController.renderEditProfile);
router.put(
  "/profile",
  isLoggedIn,
  upload.single("profileImage"),
  wrapAsync(userController.updateProfile),
);

module.exports = router;
