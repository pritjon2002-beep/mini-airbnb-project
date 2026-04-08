const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },

    image: {
        type: String,
        default:" https://www.google.com/imgres?q=elon%20musk&imgurl=https%3A%2F%2Fimage.cnbcfm.com%2Fapi%2Fv1%2Fimage%2F107293744-1693398435735-elon.jpg%3Fv%3D1738327797&imgrefurl=https%3A%2F%2Fwww.cnbc.com%2Felon-musk%2F&docid=cdvineuccqkLcM&tbnid=XVgS0ojHQvqEtM&vet=12ahUKEwjE0aOFn9uTAxW9TWwGHQcxEJMQnPAOegQIFhAB..i&w=2878&h=1918&hcb=2&ved=2ahUKEwjE0aOFn9uTAxW9TWwGHQcxEJMQnPAOegQIFhAB",
        set: (v) => v==="" ? "https://www.google.com/imgres?q=elon%20musk&imgurl=https%3A%2F%2Fimage.cnbcfm.com%2Fapi%2Fv1%2Fimage%2F107293744-1693398435735-elon.jpg%3Fv%3D1738327797&imgrefurl=https%3A%2F%2Fwww.cnbc.com%2Felon-musk%2F&docid=cdvineuccqkLcM&tbnid=XVgS0ojHQvqEtM&vet=12ahUKEwjE0aOFn9uTAxW9TWwGHQcxEJMQnPAOegQIFhAB..i&w=2878&h=1918&hcb=2&ved=2ahUKEwjE0aOFn9uTAxW9TWwGHQcxEJMQnPAOegQIFhAB" : v,
    },

    price: {
        type: Number,
        min: 500,
        max: 10000,
    },

    location: {
        type: String,

    },

    country: {
        type: String,
    }
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;

