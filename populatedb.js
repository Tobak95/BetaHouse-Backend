require("dotenv").config();
const mongoose = require("mongoose");
const PROPERTY = require("./models/propertySchema");
//data we created
const allProperties = require("./data.json");

const populate = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { dbName: "betaHOUSE" });
    await PROPERTY.deleteMany(); // Clear existing properties
    await PROPERTY.create(allProperties); // Insert new properties
    console.log("properties added");
  } catch (error) {
    console.log(error);
  }
};

populate();
