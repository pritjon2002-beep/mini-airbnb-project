// 1. Imports
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const CustomExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");

// 2. Database Connection
async function database() {
  await mongoose.connect("mongodb://127.0.0.1:27017/WanderlustFinal");
}

database()
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

// 3. App Configuration (EJS, middleware)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.engine("ejs", ejsMate); // we can use layouts for diff boilerplate.

app.use(express.static(path.join(__dirname, "public"))); // we join public folder now we can use static files

// 4. Routes

// Home
app.get("/", (req, res) => {
  res.send("Hello i am home page");
});

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  console.log(error);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new CustomExpressError(400, errMsg);
  } else {
    next();
  }
};

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

// Index
app.get(
  "/listings",
  wrapAsync(async (req, res) => {
    let allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
  }),
);

// New
app.get("/listings/new", (req, res) => {
  res.render("./listings/new.ejs");
});

// Create
app.post(
  "/listings",
  validateListing,
  wrapAsync(async (req, res, next) => {
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  }),
);

// Edit
app.get(
  "/listings/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("./listings/edit.ejs", { listing });
  }),
);

// Update
app.put(
  "/listings/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = req.body.listing;
    await Listing.findByIdAndUpdate(id, listing);
    res.redirect(`/listings/${id}`);
  }),
);

// Show
app.get(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { listing });
  }),
);

// Delete

app.delete(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listings");
  }),
);

// Review
// Review Post Route

app.post(
  "/listings/:id/reviews",
  validateReview,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    let newRev = await newReview.save();

    await listing.reviews.push(newReview._id);

    let newList = await listing.save();

    console.log(`added review : ${newList} review details : ${newRev}`);

    res.redirect(`/listings/${listing._id}`);
  }),
);

// Review Delete route
app.delete(
  "/listings/:id/reviews/:reviewId",
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
  }),
);
// app.get("/testListing", async(req,res)=> {
//     let sampleListing = new Listing({
//         title: "Mumbai Beach",
//         description: "Very beautiful beach in Mumbai that should be loved by everyone",
//         price: 1000,
//         location : "Mumbai Beach",
//         country: "India",

//     });
//     await sampleListing.save();
//     console.log("Listing Saved to Database Sucessfully");
//     res.send("Listing Saved to Database Sucessfully");

// })

app.all("/{*splat}", (req, res, next) => {
  next(new CustomExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  let { status = 500, message } = err;
  res.status(status).render("error.ejs", { err });
});

// 5. Server Start
app.listen(8080, () => {
  console.log(`Server is running on http://localhost:8080`);
});
