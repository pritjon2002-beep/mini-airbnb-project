const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controller/listings.js");

//listings route

router
  .route("/")
  //Home or Listings or index route
  .get(wrapAsync(listingController.index))
  // Create Route
  .post(
    validateListing,
    isLoggedIn,
    wrapAsync(listingController.createListing),
  );

// New
router.get("/new", isLoggedIn, listingController.showNewForm);

// Edit
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editListingForm),
);

// Update
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(listingController.updateListing),
);

// Show
router.get("/:id", wrapAsync(listingController.showListing));

// Delete

router.delete(
  "/:id",
  isOwner,
  isLoggedIn,
  wrapAsync(listingController.deleteListing),
);

module.exports = router;
