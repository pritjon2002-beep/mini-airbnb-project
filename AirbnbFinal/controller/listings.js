const Listing = require("../models/listing");

// Home / Index Route
module.exports.index = async (req, res) => {
  let allListings = await Listing.find({});
  res.render("./listings/index.ejs", { allListings });
};

// New Route
module.exports.showNewForm = (req, res) => {
  res.render("./listings/new.ejs");
};

// Create Route
module.exports.createListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;

  let newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;

  newListing.image = { url, filename };
  await newListing.save();
  req.flash("success", "New Listing Created Successfully");
  res.redirect("/listings");
};

// Edit Route
module.exports.editListingForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing Doesnot Exists!");
    return res.redirect("/listings");
  }
  res.render("./listings/edit.ejs", { listing });
};

// Update Route
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = req.body.listing;
  await Listing.findByIdAndUpdate(id, listing);
  req.flash("success", "Listing Updated Successfully");
  res.redirect(`/listings/${id}`);
};

// Show Route
module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing Doesnot Exists!");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

// Destroy Route
module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  let deleteListing = await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted Successfully");
  console.log(deleteListing);
  res.redirect("/listings");
};
