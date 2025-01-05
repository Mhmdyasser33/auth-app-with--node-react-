const express = require("express") ; 
const router = express.Router() ; 
const path = require("path") ; 
const htmlPath = path.join(__dirname , "../views/index.html") ; 
console.log(__dirname) ;

router.get("/" , (req , res)=>{
    return res.sendFile(htmlPath) ; 
    
})

module.exports = router ; 