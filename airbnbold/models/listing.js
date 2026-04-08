const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 50,
    },
    description: String,
image: {
 type: String,
 default: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
 set: (v) => v===""?  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c": v,
},



    price: {
        type: Number,
        required: true,
        min: [20, "Price must be at least ₹20"],
    },
    location: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    reviews: [
         {
        type: Schema.Types.ObjectId,
        ref: "Review",
    },
    ],
});

module.exports = mongoose.model("Listing", listingSchema);
