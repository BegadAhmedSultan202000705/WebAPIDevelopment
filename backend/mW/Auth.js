const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

// Get the JWT secret key from environment variables
const secret = process.env.JWT_SECRET;

// Middleware function to verify JWT token
function authenticate(req, res, next) {
  // Get the token from the request headers
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, secret);

    // Attach the decoded user ID to the request object
    req.userId = decoded.userId;

    // Proceed to the next middleware function or route handler
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
}

// Middleware function to authorize access based on user role
function authorize(requiredRole) {
  return (req, res, next) => {
    // Assuming you have a User model and a method to find a user by ID
    const User = require("../models/User");

    User.findById(req.userId, (error, user) => {
      if (error || !user) {
        return res.status(403).json({ error: "Forbidden" });
      }

      // Check if the user has the required role
      if (user.role === requiredRole) {
        next();
      } else {
        res.status(403).json({ error: "Forbidden" });
      }
    });
  };
}

module.exports = { authenticate, authorize };
