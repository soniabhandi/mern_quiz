const express = require("express");
const router = express.Router();
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Adjust the path as necessary

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Request Body:", req.body);

    if (!name || !email || !password) {
      return res.status(400).send("All fields are required");
    }

    if (!validator.isEmail(email)) {
      return res.status(400).send("Invalid email format");
    }

    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return res
        .status(400)
        .send(
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"
        );
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send("Email already in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign(
      { email: newUser.email, userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.cookie("token", token);

    res.status(201).send("Registered Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("All fields are required");
    }

    if (!validator.isEmail(email)) {
      return res.status(400).send("Invalid email format");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Account does not exist. Please Register");
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).send("Server error");
      }
      if (result) {
        const token = jwt.sign(
          { email: user.email, userId: user._id },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        res.cookie("token", token, { httpOnly: true });
        return res.status(200).send("Login successful");
      } else {
        return res.status(400).send("Invalid password");
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
