const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide your full name"],
    },

    lastName: {
      type: String,
      required: [true, "Please provide your full name"],
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Please provide your email address"],
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },

    password: {
      type: String,
      minLength: [true, "Password is required"],
      required: [true, "Password is required"],
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const USER = mongoose.model("user", userSchema);
module.exports = USER;
