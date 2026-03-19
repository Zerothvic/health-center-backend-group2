// src/controllers/authController.js
import { registerUser, loginUser, logoutUser } from "../services/authService.js";

// 🔹 Register a new user
const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: { user },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// 🔹 Login existing user
 const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 2️⃣ Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // 3️⃣ Call service to login
    const result = await loginUser(email, password);

    res.status(200).json({
      status: "success",
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

// 🔹 Logout user
const logout = (req, res) => {
  const result = logoutUser(); // returns a simple success message
  res.status(200).json({
    status: "success",
    message: result.message,
  });
};

export { register, login, logout };