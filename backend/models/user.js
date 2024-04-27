const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8, // Minimum length for security
  },
});

// Pre-save hook to hash password before saving user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  // Hash the password using bcrypt
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare provided password with hashed password
userSchema.methods.comparePassword = function (providedPassword) {
  return bcrypt.compare(providedPassword, this.password);
};

// Create the User model using the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
