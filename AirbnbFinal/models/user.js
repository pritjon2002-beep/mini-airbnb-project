const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  //username and password is automatically added by passport-local-mongoose

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  googleId: {
    type: String,
  },

  savedListings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Listing",
    },
  ],

  profileImage: {
    type: String,
    default: "https://api.dicebear.com/7.x/initials/svg?seed=default",
  },
});

userSchema.plugin(passportLocalMongoose); // implement username , pass , hashing and salting

const User = mongoose.model("User", userSchema);
module.exports = User;
