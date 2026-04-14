
const express = require("express");
const app = express();

const mongoose = require("mongoose");

const Listing = require("./models/listing.js");

const path = require("path") //this is for ejs setup

const methodOverride = require("method-override"); //it helps to make post request to put request . make easy to edit listings

database()
.then(()=>{
    console.log("Database Connected Sucessfully");
})
.catch((err)=>{
    console.log(err);
    
})


async function database(){
    await mongoose.connect("mongodb://127.0.0.1:27017/WanderlustFinal");
}


app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views")) // connect views folder safely

app.use(express.urlencoded({extended: true})) // parse form data from HTML requests and make it availabel in req.body
app.use(methodOverride("_method")); // now we can use method put in ejs file 

//home route
app.get("/",(req,res)=> {
    res.send("Hello i am home page");
});

//index route
app.get("/listings",async(req,res)=>{
    let allListings = await Listing.find({});
    res.render("./listings/index.ejs", {allListings});
})
//new route
app.get("/listings/new", (req,res)=> {
    res.render("./listings/new.ejs")
})

//edit route : 

app.get("/listings/:id/edit", async(req,res)=>{
    let {id} = req.params;
   let listing =  await Listing.findById(id);
   res.render("./listings/edit.ejs", {listing})
})




    
// show route

app.get("/listings/:id", async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
})

// create route
app.post("/listings", async(req,res)=>{
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");

})

// update route

app.put("/listings/:id", async(req,res)=>{
    let {id} = req.params;
    let listing = req.body.listing;
    await Listing.findByIdAndUpdate(id,listing);
    res.redirect(`/listings/${id}`);

})


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


app.listen(8080,()=>{
    console.log("Server is running on port 8080");
    
})