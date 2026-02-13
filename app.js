const express = require('express');
const app = express();
const methodOverride = require('method-override');

const mongoose = require('mongoose');
const Listing = require('./models/listing.js'); // listing schema
const path = require('path'); // now we can use ejs files
const ejsMate = require('ejs-mate');
const wrapAsync = require('./utils/wrapAsync.js');
const ExpressError = require('./utils/ExpressError.js');
const listingSchema  = require('./schema.js');




app.use(express.urlencoded({ extended: true })); // now we can use id of url
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);



async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

main().then(() => {
    console.log(`Database connected Sucessfully`);

}).catch(err => {
    console.log(err);

});


app.get("/", (req, res) => {
    res.send("app is working");
});

const validateListing = (req, res, next) => {

    let { error } = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400, result.error);
    }else{
        next();
    }

}

// create route

app.get("/listing", wrapAsync(async (req, res) => {
    let allListing = await Listing.find({});
    res.render("listings/index.ejs", { allListing });
}))
// create route

app.get("/listing/new", (req, res) => {
    res.render("listings/new.ejs");
});
app.post("/listing/new", wrapAsync(async (req, res, next) => {


    const newListing = new Listing(req.body.listing);
    await newListing.save();

    res.redirect("/listing");
}));


// edit route

app.get("/listing/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    res.render("listings/edit.ejs", { listing });
}))
app.put("/listing/:id", wrapAsync(async (req, res) => {

    let { id } = req.params;

    if (!req.body.listing) {
        throw new ExpressError(400, "Invalid listing data");
    }

    await Listing.findByIdAndUpdate(
        id,
        { ...req.body.listing },
        { new: true, runValidators: true }
    );

    res.redirect(`/listing/${id}`);
}));


app.delete("/listing/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;

    let del = await Listing.findByIdAndDelete(id);
    res.redirect("/listing");
}))

// show route
app.get("/listing/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
}))

app.use((req, res, next) => {
    next(new ExpressError(404, "page not found"))
})


app.use((err, req, res, next) => {
    let { cerr } = err;
    let { status = 500, message } = err;
    res.status(status).render("error.ejs", { message })
    // res.status(status).send(message);

})

app.listen(8080, () => {
    console.log(`server is running on : http://localhost:8080/`);

});