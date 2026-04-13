
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const Listing = require("./models/listing.js");

main()
.then(()=>{
    console.log("Database Connected Sucessfully");
})
.catch((err)=>{
    console.log(err);
    
})


async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/WanderlustFinal");
}


app.get("/",(req,res)=> {
    res.send("Hello i am home page");
});


app.get("/listings", async(req,res)=>{
  let allListings = await Listing.find({});
  res.render("index.ejs", {allListings});
});

    

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