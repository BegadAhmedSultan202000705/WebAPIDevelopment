const AccessToken = require("../Models/token_Access");

const destroyAccessToken = async (req, res) => {
  if (!req.verified) {
    return res.status(403).json({ msg: req.msg });
  }

  const userId = req.id;

  try {
    await AccessToken.deleteOne({ user: userId });

    return res
      .status(200)
      .json({ msg: "Access token destroyed successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: `Error destroying access token: ${error.message}` });
  }
};

module.exports = { destroyAccessToken };
