const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  image: {
    filename: {
      type: String,
      default: "listingimage",
    },
    url: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      set: (v) =>
        v === ""
          ? "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
          : v,
    },
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
  },

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

// mongoose middleware to handle deletion
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    let delRev = await Review.deleteMany({ _id: { $in: listing.reviews } });
    console.log(`mongoose middleware-deleted reviews : ${delRev}`);
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
