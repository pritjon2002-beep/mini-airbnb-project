const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

//listings

// Index
router.get(
  "/",
  wrapAsync(async (req, res) => {
    let allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
  }),
);

// New
router.get("/new", isLoggedIn, (req, res) => {
  res.render("./listings/new.ejs");
});

// Create
router.post(
  "/",
  validateListing,
  isLoggedIn,
  wrapAsync(async (req, res, next) => {
    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created Successfully");
    res.redirect("/listings");
  }),
);

// Edit
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing Doesnot Exists!");
      return res.redirect("/listings");
    }
    res.render("./listings/edit.ejs", { listing });
  }),
);

// Update
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = req.body.listing;
    await Listing.findByIdAndUpdate(id, listing);
    req.flash("success", "Listing Updated Successfully");
    res.redirect(`/listings/${id}`);
  }),
);

// Show
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({ path: "reviews", populate: { path: "author" } })
      .populate("owner");
    if (!listing) {
      req.flash("error", "Listing Doesnot Exists!");
      return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
  }),
);

// Delete

router.delete(
  "/:id",
  isOwner,
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted Successfully");
    console.log(deleteListing);
    res.redirect("/listings");
  }),
);

module.exports = router;
