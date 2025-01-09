const express = require("express")
const router = express.Router(); 
const userController = require("../controllers/userController")
const verifyJWT = require("../middleware/verifyJWT")

router.use(verifyJWT) ; 
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags : [Users]  
 *     description: This endpoint retrieves all users from the database, excluding their passwords for security reasons.
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "64b3e59fcd7b8e0012345678"
 *                   first_name:
 *                     type: string
 *                     example: "Mohamed"
 *                   last_name:
 *                     type: string
 *                     example: "Yasser"
 *                   email:
 *                     type: string
 *                     example: "mohamed@example.com"
 *       400:
 *         description: No users found in the database.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No users found"
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error in server"
 */

router.get("/" , userController.getAllUser) ;

module.exports = router;