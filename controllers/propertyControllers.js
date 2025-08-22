const PROPERTY = require("../models/propertySchema");

const getAllProperties = async (req, res) => {
  try {
    const allProperty = await PROPERTY.find();
    if (allProperty.length === 0) {
      return res.status(404).json({ message: "No Property Found" });
    }
    res.status(200).json(allProperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { getAllProperties };
