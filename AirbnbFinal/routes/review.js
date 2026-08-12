const express = require("express");
const router = express.Router({ mergeParams: true }); // merge params -> able to use parents parameter
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const CustomExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  console.log(error);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new CustomExpressError(400, errMsg);
  } else {
    next();
  }
};

//Review routes

// Review Post Route
router.post(
  "/",
  validateReview,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview._id);

    let newList = await listing.save();
    let newRev = await newReview.save();

    req.flash("success", "Review Added Successfully");
    console.log(`added review : ${newList} review details : ${newRev}`);

    res.redirect(`/listings/${listing._id}`);
  }),
);

// Review Delete route
router.delete(
  "/:reviewId",
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    let delReview = await Review.findByIdAndDelete(reviewId);

    let listing = await Listing.findByIdAndUpdate(id, {
      $pull: { reviews: reviewId },
    });

    req.flash("success", "Review Deleted Successfully");
    console.log(
      `deleted review : ${delReview} , New listing detail is ${listing}`,
    );

    res.redirect(`/listings/${id}`);
  }),
);

module.exports = router;
