const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main()
  .then(() => {
    console.log("Database Connected Sucessfully");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/WanderlustFinal");
}

const initialData = async () => {
  await Listing.deleteMany({});
  const dataWithOwner = initData.data.map((obj) => ({
    ...obj,
    owner: "6a8023c33dbc958190ee52c2",
  }));
  await Listing.insertMany(dataWithOwner);
  console.log("Data Initialized Sucessfully");
};

initialData();
