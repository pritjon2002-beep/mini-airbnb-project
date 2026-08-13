const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    require: true,
  },
  //username and password is automatically added by passport-local-mongoose
});

User.plugin(passportLocalMongoose); // implement username , pass , hashing and salting

const User = mongoose.model("User", userSchema);
module.exports = User;
