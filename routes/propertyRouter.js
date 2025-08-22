const router = require("express").Router();

const { getAllProperties } = require("../controllers/propertyControllers");
router.get("/allproperty", getAllProperties);

module.exports = router;
