const Listing = require("../models/listing.js");
const User = require("../models/user.js");
const Review = require("../models/review.js");

module.exports.renderDashboard = async (req, res) => {
  const listings = await Listing.find({}).populate("owner");
  const users = await User.find({});
  const reviews = await Review.find({}).populate("author").populate("listing");

  res.render("admin/dashboard.ejs", { listings, users, reviews });
};
