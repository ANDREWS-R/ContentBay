const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();


// REGISTER
router.post("/register", async (req, res) => {

  try {

    let { username, password } = req.body;

    // REMOVE EXTRA SPACES
    username = username?.trim();
    password = password?.trim();

    // CHECK EMPTY
    if (!username || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // USERNAME VALIDATION
    if (username.length < 3) {
      return res.status(400).json({
        message: "Username must be at least 3 characters",
      });
    }

    // PASSWORD LENGTH
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }

    // STRONG PASSWORD VALIDATION
    const strongPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

    if (!strongPassword.test(password)) {
      return res.status(400).json({
        message:
          "Password must contain uppercase, lowercase and number",
      });
    }

    // CHECK EXISTING USER
    const existingUser = await User.findOne({
      username,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // CREATE USER
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
      error,
    });

  }

});


// LOGIN
router.post("/login", async (req, res) => {

  try {

    let { username, password } = req.body;

    // REMOVE EXTRA SPACES
    username = username?.trim();
    password = password?.trim();

    // CHECK EMPTY
    if (!username || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // CHECK USER
    const user = await User.findOne({
      username,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // CREATE TOKEN
    const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      role: user.role,
    },
    "secretkey",
    {
      expiresIn: "7d",
    }
  );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
      error,
    });

  }

});

module.exports = router;