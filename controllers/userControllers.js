//The user controller handles user-related operations such as registration, login, and profile management.

const USER = require("../models/users");
const bcrypt = require("bcrypt");
const generateToken = require("../helpers/generateToken");
const jwt = require("jsonwebtoken");

const handleRegister = async (req, res) => {
  //destructuring the register action or logic from the userSchema from the request body
  const { firstName, lastName, email, password } = req.body;

  try {
    //check if the user already exists or find the user by email

    const alreadyExistingUser = await USER.findOne({
      $or: [{ email: email || null }],
    });

    console.log(firstName, lastName, email, password);

    if (alreadyExistingUser) {
      return res.status(400).json({ message: "Email already exist" });
    }
    // protecting users password : bcrypt would be installed for hashing password

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    //verify process
    const verificationToken = generateToken();
    const verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000;
    //save to database
    const user = await USER.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpires,
    });

    return res
      .status(201)
      .json({ success: true, message: "User Registered Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

//handle register has been set up and the next thing i need to fix is my handle email verification, which would be verified with a token

//handling log-in with the already registered unique email and password
const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  //finding a user with a unique email
  try {
    const user = await USER.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Account not found, Please Register" });
    }

    //checking if password is correct while the user is logging in
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //generate token  (validity, period) jwt would be used for authorization,
    //payload means the unique identification of the user
    //jsonwebtoken is used to sign the token, and its would be installed in the terminal as npm i jason web token

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1 day",
    });

    return res.status(200).json({
      token,
      message: "Login successful",
      success: true,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  handleRegister,
  handleLogin,
};
