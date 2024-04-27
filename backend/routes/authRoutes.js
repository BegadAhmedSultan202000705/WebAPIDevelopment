const express = require("express");
const authController = require("../controllers/AuthController");

const router = express.Router();

// Define routes for user registration and login
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
