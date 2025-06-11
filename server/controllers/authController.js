const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  console.log("Register attempt received:", { email: req.body.email });
  const { email, password } = req.body;
  
  try {
    // Check if user exists
    console.log("Checking if user exists...");
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("Registration failed: User already exists");
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash password
    console.log("Hashing password...");
    const hashed = await bcrypt.hash(password, 10);
    
    // Create user
    console.log("Creating new user...");
    const newUser = await User.create({ email, password: hashed });
    console.log("User created successfully:", { id: newUser._id, email: newUser.email });

    // Generate token
    console.log("Generating JWT token...");
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    
    console.log("Registration successful, sending response");
    res.status(201).json({ token });
  } catch (err) {
    console.error("Registration error:", {
      message: err.message,
      stack: err.stack,
      code: err.code,
      name: err.name
    });
    
    // Handle specific MongoDB errors
    if (err.code === 11000) {
      return res.status(400).json({ msg: "Email already in use" });
    }
    
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.login = async (req, res) => {
  console.log("Login attempt received:", { email: req.body.email });
  const { email, password } = req.body;
  
  try {
    console.log("Finding user...");
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Login failed: User not found");
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    console.log("Comparing passwords...");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Login failed: Password doesn't match");
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    console.log("Generating JWT token...");
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    
    console.log("Login successful, sending response");
    res.json({ token });
  } catch (err) {
    console.error("Login error:", {
      message: err.message,
      stack: err.stack,
      code: err.code,
      name: err.name
    });
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.getUser = async (req, res) => {
  console.log("Get user request received for ID:", req.user.id);
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ msg: "User not found" });
    }
    console.log("User found:", { id: user._id, email: user.email });
    res.json(user);
  } catch (err) {
    console.error("Get user error:", {
      message: err.message,
      stack: err.stack,
      code: err.code,
      name: err.name
    });
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

