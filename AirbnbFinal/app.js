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

app.get("/testListing",async(req,res)=>{
    let sampleListing = new Listing({
        title: "Zure Formal",
        description: " Have a good look",
        image:"https://www.google.com/imgres?q=elon%20musk&imgurl=https%3A%2F%2Fwww.equilar.com%2Fimages%2Fblog%2F606%2Fblog-tesla-approves-new-award-for-elon-musk.png&imgrefurl=https%3A%2F%2Fwww.equilar.com%2Ftesla-approves-new-award-for-elon-musk-how-does-it-compare-to-the-largest-pay-packages-on-record%2F&docid=kFERGIp3fFZ2aM&tbnid=driQ2Qyx5H8PrM&vet=12ahUKEwjE0aOFn9uTAxW9TWwGHQcxEJMQnPAOegQIGBAB..i&w=1600&h=800&hcb=2&ved=2ahUKEwjE0aOFn9uTAxW9TWwGHQcxEJMQnPAOegQIGBAB",
        price: 2000,
        location: "Kathmandu",
        country: "Nepal",
    });
   
    await sampleListing.save();
    console.log("saved");
    res.send("deal done");
    


});



app.listen(8080, ()=>{
    console.log("Server is running on port 8080");
});