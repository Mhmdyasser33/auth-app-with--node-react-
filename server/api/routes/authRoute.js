const express = require("express") ;
const router = express.Router() ; 
const authController = require("../controllers/authController")

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags : [Authentication]
 *     description: This endpoint registers a new user by taking first name, last name, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: Mohamed
 *               last_name:
 *                 type: string
 *                 example: Yasser
 *               email:
 *                 type: string
 *                 example: mohamed@example.com
 *               password:
 *                 type: string
 *                 example: Passw0rd!
 *     responses:
 *       201:
 *         description: User successfully registered.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 first_name:
 *                   type: string
 *                   example: Mohamed
 *                 last_name:
 *                   type: string
 *                   example: Yasser
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR..."
 *       400:
 *         description: Bad Request. Missing fields or user already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "all fields are required"
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error in registering user"
 */
router.post("/register", authController.register);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags : [Authentication]
 *     description: This endpoint allows a user to log in by providing an email and password. Returns an access token and sets a refresh token in an HTTP-only cookie.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: mohamed@example.com
 *               password:
 *                 type: string
 *                 example: Passw0rd!
 *     responses:
 *       200:
 *         description: User successfully logged in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: mohamed@example.com
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR..."
 *       400:
 *         description: Bad Request. Missing email or password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "all fields are required"
 *       401:
 *         description: Unauthorized. User does not exist or password is incorrect.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "user does not exist"
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error in login user"
 */
router.post("/login", authController.login);
/**
 * @swagger
 * /auth/refresh:
 *   get:
 *     summary: Refresh access token
 *     tags : [Authentication]
 *     description: This endpoint generates a new access token using a valid refresh token stored in an HTTP-only cookie.
 *     responses:
 *       200:
 *         description: Successfully refreshed access token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR..."
 *       401:
 *         description: Unauthorized. Refresh token is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "unauthorized"
 *       403:
 *         description: Forbidden. Refresh token has expired or is invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Forbidden"
 *       400:
 *         description: Bad Request. Error occurred while generating a new access token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error in get new accessToken"
 */

router.get("/refresh", authController.refresh);
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: User logout
 *     tags : [Authentication]
 *     description: This endpoint logs out a user by clearing the refresh token cookie.
 *     responses:
 *       204:
 *         description: No Content. No cookie was found, but the request was successful.
 *       200:
 *         description: Logout successful. Cookies cleared.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "cookies cleared successfully"
 */

router.post("/logout", authController.logout);
/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Request a password reset email.
 *     description: Generates a password reset token for the user and sends a reset email with a link containing the token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user requesting the password reset.
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Password reset email successfully sent.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password reset email sent.
 *       400:
 *         description: Invalid request or user not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found.
 *       500:
 *         description: Internal server error or email sending failure.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error.
 */

router.post("/forgot-password",authController.forgotPassword);
/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset user password using a valid token.
 *     description: Allows users to reset their password by providing a valid reset token and a new password. The token is checked for validity and expiration.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The password reset token sent via email.
 *         example: some-random-token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: The new password for the user.
 *                 example: securepassword123
 *     responses:
 *       200:
 *         description: Password reset successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: password has been reset successfully
 *       400:
 *         description: Invalid request (e.g., expired token or invalid password).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   examples:
 *                     tokenExpired:
 *                       value: Token expire
 *                     invalidPassword:
 *                       value: password must be greater than 6 character long
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

router.post(`/reset-password/:token`,authController.resetPassword)



module.exports = router ; 