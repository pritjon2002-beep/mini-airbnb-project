// 1. Imports
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const CustomExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user.js");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

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

//session
const sessionOption = {
  secret: "mysecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser()); //Stores the user's ID in the session after login.
passport.deserializeUser(User.deserializeUser()); //Uses the stored ID to find the user again on later requests.

app.use((req, res, next) => {
  res.locals.successMsg = req.flash("success");
  res.locals.failureMsg = req.flash("failure");
  next();
});

//add a user to db ->
app.get("/demo", async (req, res) => {
  let fakeUser = new User({
    email: "fake@gmail.com",
    username: "fakeuser",
  });

  let registeredUser = await User.register(fakeUser, "password2000");
  res.send(registeredUser);
});

// 4. Routes

// Home
app.get("/", (req, res) => {
  res.send("Hello i am home page");
});

//listing route
app.use("/listings", listings);

//review route
app.use("/listings/:id/reviews", reviews);

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
