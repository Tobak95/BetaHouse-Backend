const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const creteProperty = new Schema({
  salesTag: {
    type: String,
    enum: ["For Rent", "For Sale"],
    default: "For Sale",
  },

  featuredTag: {
    type: String,
    emum: "Featured",
  },

  title: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  bedrooms: {
    type: String,
    required: true,
  },

  bathrooms: {
    type: String,
    required: true,
  },

  house: {
    type: String,
    required: true,
  },

  price: {
    type: String,
    required: true,
  },
});

const PROPERTY = mongoose.model("properties", creteProperty);
module.exports = PROPERTY;
