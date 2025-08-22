require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8011;
const userRouter = require("./routes/userRouter");
const cors = require("cors");
const propertyRouter = require("./routes/propertyRouter");

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running!" });
});
//the userRouter which is imported above in line 6 would be called below
app.use("/api/auth", userRouter);
app.use("/api/auth", propertyRouter);

//error handling routes
app.use((req, res) => {
  res.status(400).json({ success: false, message: "Route not found!" });
});

//start-server

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { dbName: "betaHOUSE" });
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    console.error("Error connecting to the database");
  }
};
startServer();
