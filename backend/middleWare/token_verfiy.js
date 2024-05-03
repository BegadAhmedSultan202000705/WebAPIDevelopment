const Token = require("../Models/token_Access");

const isTokenPresent = async (token) => {
  return !!(await Token.findOne({ token }));
};

const verifyToken = async (req, res, next) => {
  const authHeader = req.header("authorization");
  if (!authHeader) {
    req.verified = false;
    req.msg = "Authorization header not found";
    return next();
  }

  const parts = authHeader.split(" ");
  if (parts.length === 3 && parts[0] === "OAT") {
    const accessToken = parts[1];
    const userId = parts[2];

    const tokenExists = await isTokenPresent(accessToken);
    if (tokenExists) {
      req.id = userId;
      req.verified = true;
    } else {
      req.verified = false;
      req.msg = "Invalid JWT token";
    }
  } else {
    req.verified = false;
    req.msg = "Authorization header is malformed";
  }

  next();
};

module.exports = { verifyToken };
