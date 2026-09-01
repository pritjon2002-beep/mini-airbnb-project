if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const dbURL = process.env.MONGO_URL;

main()
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbURL);
}

const initialData = async () => {
  await Listing.deleteMany({});
  const dataWithOwner = initData.data.map((obj) => ({
    ...obj,
    owner: "6a8023c33dbc958190ee52c2", // replace with a real user's _id from your DB
  }));
  await Listing.insertMany(dataWithOwner);
  console.log("Data Initialized Successfully");
};

initialData();
