const express = require("express")
const router = express.Router(); 
const userController = require("../controllers/userController")
const verifyJWT = require("../middleware/verifyJWT")

router.use(verifyJWT) ; 
router.get("/" , userController.getAllUser) ;

module.exports = router;