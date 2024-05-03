const mongoose = require("mongoose");

const accessTokenSchema = mongoose.Schema(
  {
    token: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestaps: true }
);

const AccessToken = mongoose.model("Token", accessTokenSchema);

module.exports = AccessToken;
