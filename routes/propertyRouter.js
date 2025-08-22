const router = require("express").Router();

const { getAllProperties } = require("../controllers/propertyControllers");
router.get("/all-property", getAllProperties);

module.exports = router;
