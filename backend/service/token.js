const { v4: uuidv4 } = require("uuid");
const Token = require("../Models/token_Access");

const injectUserIdIntoToken = ({ token, userId }) => {
  return `${token} ${userId}`;
};

const generateToken = async ({ userId = "" }) => {
  const token = uuidv4();

  const newToken = new Token({
    token,
    user: userId,
  });

  try {
    await newToken.save();

    return injectUserIdIntoToken({ token, userId });
  } catch (error) {
    throw new Error(`Error generating token: ${error.message}`);
  }
};

module.exports = { generateToken };
