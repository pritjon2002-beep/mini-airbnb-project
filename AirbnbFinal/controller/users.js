const User = require("../models/user");
const Booking = require("../models/booking.js");
const Listing = require("../models/listing.js");

//signup get
module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

//signup post
module.exports.signup = async (req, res, next) => {
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
};

//login get
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

//login post
module.exports.login = async (req, res) => {
  req.flash("success", "logged In Successfully");
  redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

//logout
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logout Successfully");
    res.redirect("/listings");
  });
};

//showfavlist
module.exports.showWishlist = async (req, res) => {
  let user = await User.findById(req.user._id).populate("savedListings");
  res.render("users/wishlist.ejs", { savedListings: user.savedListings });
};

//show profile
module.exports.showProfile = async (req, res) => {
  let user = await User.findById(req.user._id);
  let bookingsCount = await Booking.countDocuments({ user: req.user._id });
  let listingsCount = await Listing.countDocuments({ owner: req.user._id });

  res.render("users/profile.ejs", { user, bookingsCount, listingsCount });
};
