require("dotenv").config();
const express = require("express") ; 
const app = express() ; 
const connectDb = require("./config/dbConn") ; 
const mongoose = require("mongoose") ; 
const cors = require("cors") ; 
const path = require("path")
const cookieParser = require("cookie-parser")
const corsOptions = require("./config/allowedOptions")
const port = process.env.PORT || 5000 ;  
const rootRoute = require("./routes/rootRoute")
const authRoute = require("./routes/authRoute") ; 
const userRoute = require("./routes/userRoute") ;
// first connect db
connectDb()
// set cors
app.use(cors(corsOptions)) ;
app.use(cookieParser()) 
// to convert | parse date to json 
app.use(express.json()) 
app.use("/" , rootRoute) ; 
app.use("/auth" , authRoute) ; 
app.use("/users" , userRoute);
app.use("/" , express.static("./static"))
mongoose.connection.once("open" , ()=>{
    console.log("connect to mongoDb") ; 
    app.listen(port , ()=>{
        console.log(`server running successfully in port ${port}`) ; 
    })
})
// to handle error if happen when connect to db 
mongoose.connection.on("error" , (err)=>{
    console.log(`error in connecting db ${err}`) ; 
})

// to handle route not handled in backend 
app.all("*" , (req , res)=>{
    if(req.accepts("html")){
        res.status(404).sendFile(path.join(__dirname , "./views/404.html"))
    }else if(req.accepts("json")){
        res.status(404).json({message : "404 not found"})
    }else{
        res.status(404).type("txt").send("404 not found") ; 
    }
})

// app.get("/" , (req , res)=>{
//    console.log(req.cookies) ; 
//    res.send("cookies send successfully")
// })

// app.get("/set-cookie" , (req , res)=>{
//     res.cookie("name" , "mohamed")
//     res.send("cookie send successfully")
// })

// app.get("/delete-cookie" , (req , res)=>{
//     res.clearCookie("name") ;
//     res.send("cookie deleted successfully")
// })