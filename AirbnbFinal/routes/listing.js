const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controller/listings.js");
//multer
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage }); // saves files in uploads file

//listings route

router
  .route("/")
  //Home or Listings or index route
  .get(wrapAsync(listingController.index))
  // Create Route
  // .post(
  //   validateListing,
  //   isLoggedIn,
  //   wrapAsync(listingController.createListing),
  // );
  .post(upload.single("listing[image]"), (req, res) => {
    res.send(req.file);
  });

// New Listing Route
router.get("/new", isLoggedIn, listingController.showNewForm);

router
  .route("/:id")
  //Show Route
  .get(wrapAsync(listingController.showListing))
  //Update Route
  .put(
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.updateListing),
  )
  .delete(isOwner, isLoggedIn, wrapAsync(listingController.deleteListing));

// Edit
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editListingForm),
);

module.exports = router;
