const express = require('express');
const app = express();
const methodOverride = require('method-override');

const mongoose = require('mongoose');
const Listing = require('./models/listing.js'); // listing schema
const path = require('path'); // now we can use ejs files
const ejsMate = require('ejs-mate');



app.use(express.urlencoded({ extended: true })); // now we can use id of url
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);



async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

main().then(() => {
    console.log(`Database connected Sucessfully`);
    
}).catch(err => {
    console.log(err);
    
});


app.get("/", (req,res) => {
    res.send("app is working");
});

// create route

app.get("/listing" , async(req, res)=> {
 let  allListing =  await Listing.find({});
 res.render("listings/index.ejs",{allListing});
})
// create route

app.get("/listing/new", (req, res) => {
    res.render("listings/new.ejs");
});

app.post("/listing/new", async(req,res) => {
    let{ title,description,price,location,country } = req.body;
    Listing.insertMany({
        title: title,
        description: description,
        price: price,
        location: location,
        country: country
    });
    res.redirect("/listing");
    
})

// edit route

app.get("/listing/:id/edit", async(req, res) => {
    let {id} = req.params;
     let  listing =  await Listing.findById(id);


    res.render("listings/edit.ejs",{listing});
})

app.put("/listing/:id", async(req, res)=> {
    let {title,description,price,location,country} = req.body;
      let {id} = req.params;
     let  listing =  await Listing.findByIdAndUpdate(id,{title: title, description: description, price:price,location:location,country:country},{new: true, runValidators:true});
     res.redirect("/listing");
    
});

app.delete("/listing/:id", async(req, res) => {
    let {id} = req.params;

    let del = await Listing.findByIdAndDelete(id);
    res.redirect("/listing");
})

// show route
app.get("/listing/:id", async(req, res) => {
    let{ id} = req.params;
    let  listing =  await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
})



     
       
     
 



app.listen(8080,() => {
    console.log(`app is listening on port 8080`);
    
});