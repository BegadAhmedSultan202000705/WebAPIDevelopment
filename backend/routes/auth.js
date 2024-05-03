const express = require("express");
const bodyParser = require("body-parser");
const { loginUser, registerUser } = require("../controllers/auth");

const authRoutes = express.Router();

authRoutes.use(bodyParser.urlencoded({ extended: false }));
authRoutes.use(bodyParser.json());

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Allows a user to log in by providing their credentials (username and password).
 *     requestBody:
 *       description: User credentials.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *                 example: john_doe
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 format: password
 *                 example: mysecurepassword
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Successful login; returns a JWT access token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: JSON Web Token for the authenticated user.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *       400:
 *         description: Bad request due to missing or invalid credentials.
 *       401:
 *         description: Unauthorized; login failed due to invalid credentials.
 *       500:
 *         description: Internal server error.
 */
authRoutes.post("/login", loginUser);

/**
 * @swagger
 * /register:
 *   post:
 *     summary: User registration
 *     description: Allows a user to register by providing their information (e.g., username, password, email).
 *     requestBody:
 *       description: User registration data.
 *       required: true.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The desired username of the user.
 *                 example: john_doe
 *               password:
 *                 type: string
 *                 description: The desired password of the user.
 *                 format: password
 *                 example: mysecurepassword
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *                 format: email
 *                 example: johndoe@example.com
 *             required:
 *               - username
 *               - password
 *               - email
 *     responses:
 *       201:
 *         description: Successful registration; returns the newly created user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier of the newly registered user.
 *                   example: "60d9f920f1c4b627b7f4a2d3"
 *                 username:
 *                   type: string
 *                   description: The username of the newly registered user.
 *                   example: john_doe
 *                 email:
 *                   type: string
 *                   description: The email address of the newly registered user.
 *                   format: email
 *                   example: johndoe@example.com
 *       400:
 *         description: Bad request due to missing or invalid data.
 *       409:
 *         description: Conflict due to a duplicate username or email.
 *       500:
 *         description: Internal server error.
 */
authRoutes.post("/register", registerUser);

module.exports = { authRoutes };
