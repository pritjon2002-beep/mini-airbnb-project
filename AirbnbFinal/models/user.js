const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  //username and password is automatically added by passport-local-mongoose

  googleId: {
    type: String,
  },
});

userSchema.plugin(passportLocalMongoose); // implement username , pass , hashing and salting

const User = mongoose.model("User", userSchema);
module.exports = User;
