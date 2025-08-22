const router = require("express").Router();

const {
  handleRegister,
  handleLogin,
} = require("../controllers/userControllers");

router.post("/register", handleRegister);
router.post("/login", handleLogin);

module.exports = router;
