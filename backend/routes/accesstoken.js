const express = require("express");
const accessTokenRoutes = express.Router();
const bodyParser = require("body-parser");
const { destroyAccessToken } = require("../controllers/Access_token");

accessTokenRoutes.use(bodyParser.urlencoded({ extended: false }));
accessTokenRoutes.use(bodyParser.json());
/**
 * @swagger
 * /destroy:
 *   delete:
 *     summary: Destroy an access token
 *     description: Deletes the access token and invalidates it.
 *     responses:
 *       204:
 *         description: Access token deleted successfully
 *       400:
 *         description: Bad request, possibly due to invalid parameters
 *       401:
 *         description: Unauthorized, missing or invalid authentication token
 *       403:
 *         description: Forbidden, user does not have permission to delete the token
 *       500:
 *         description: Server error
 */

accessTokenRoutes.delete("/destroy", destroyAccessToken);

module.exports = { accessTokenRoutes };
