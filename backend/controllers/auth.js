const bcrypt = require("bcrypt");
const User = require("../models/user");
const { generateToken } = require("../service/token");

const getUser = async (email, attempt) => {
  try {
    const user = await User.findOne({ email });
    if (user) {
      if (attempt === "login") {
        return {
          isNewUserEntry: false,
          userData: user,
          msg: "User exists. Ready to log in.",
        };
      } else if (attempt === "register") {
        return {
          isNewUserEntry: false,
          userData: user,
          msg: "User with this email already exists. Try signing in with a different email.",
        };
      }
    } else {
      if (attempt === "login") {
        return {
          isNewUserEntry: true,
          userData: null,
          msg: "Email not found. Please sign up first.",
        };
      } else if (attempt === "register") {
        return {
          isNewUserEntry: true,
          userData: null,
          msg: "Email not found in the database. Ready to sign up.",
        };
      }
    }
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};

const validateInput = (data, isLogin = false) => {
  const { email, password, name } = data;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return { isValid: false, msg: "Invalid email format." };
  }

  if (!password) {
    return { isValid: false, msg: "Password is required." };
  }

  if (!isLogin) {
    if (password.length < 8) {
      return {
        isValid: false,
        msg: "Password must be at least 8 characters long.",
      };
    }

    if (!name) {
      return { isValid: false, msg: "Name is required for registration." };
    }
  }

  return { isValid: true };
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const { isValid, msg } = validateInput({ name, email, password });
  if (!isValid) {
    return res.status(400).json({ msg });
  }

  const { msg: userMsg, isNewUserEntry } = await getUser(email, "register");
  if (!isNewUserEntry) {
    return res.status(400).json({ msg: userMsg });
  }

  const hashedPassword = bcrypt.hashSync(password.toString(), 4);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return res.status(201).json({ msg: "Account created successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: `Error creating account: ${error.message}` });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const { isValid, msg } = validateInput({ email, password }, true);
  if (!isValid) {
    return res.status(400).json({ msg });
  }

  const {
    userData,
    msg: userMsg,
    isNewUserEntry,
  } = await getUser(email, "login");
  if (isNewUserEntry) {
    return res.status(400).json({ msg: userMsg });
  }

  const isPasswordValid = bcrypt.compareSync(
    password.toString(),
    userData.password
  );
  if (!isPasswordValid) {
    return res.status(400).json({ msg: "Invalid password." });
  }

  try {
    const token = await generateToken({ userId: userData._id });
    userData.password = null;
    return res.status(200).json({
      userData,
      msg: "Login successful",
      accessToken: token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: `Error during login: ${error.message}` });
  }
};

module.exports = { registerUser, loginUser };
