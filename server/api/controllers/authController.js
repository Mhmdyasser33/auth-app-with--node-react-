const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken") ; 
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
const register = async ( req , res )=>{
   try{
    const {first_name , last_name , email , password } = req.body ; 
    if(!first_name || !last_name || !email || !password){
       return res.status(400).json({message : "all field are required"})
    }
    const foundUser = await User.findOne({email})
    if(foundUser){
       return res.status(400).json({message : "already existing user.!"})
    }
    // hashed password entered by user
    const hashedPassword = await bcrypt.hash(password , 10) ;
    const createdUser = await User.create({
       first_name ,
       last_name ,
       email ,
       password : hashedPassword
    })
   
    const accessToken = await jwt.sign({
        // payload 
        userInfo : {
           id : createdUser._id
        }
    },accessTokenSecret , {expiresIn : "15m"}) ; 
   
    const refreshToken = await jwt.sign({
       userInfo : {
          id :  createdUser._id
       } 
    }, refreshTokenSecret , {expiresIn : "7d"}) ; 
    res.cookie("jwt" , refreshToken , {
        httpOnly : true ,
        secure : true,
        sameSite : "none" ,
        // cookies will expire with the same time of refreshToken
        maxAge : 7 * 24 * 60 * 60 * 1000
    })
     
    return res.status(201).json({first_name : createdUser.first_name ,last_name : createdUser.last_name , accessToken})
   }catch(err){
     return res.status(500).json({message : `Error in registering user ${err.message}`})
   }
   
 
}

const login = async (req , res)=>{
    try{
        const {email , password} = req.body ; 
        if(!email || !password){
            return res.status(400).json({message : "all field are required"}) ; 
        }
        const foundedUser = await User.findOne({email}) ; 
        if(!foundedUser){
            return res.status(401).json({message :  "user does not exist"}) ; 
        }
        // check password entered by user with password stored in db
        const isPasswordMatch = await bcrypt.compare(password , foundedUser.password) ; 
        if(!isPasswordMatch){
            return res.status(400).json({message : "Wrong password"}) ; 
        }
        const accessToken = await jwt.sign({
            userInfo : {
                id : foundedUser._id
            },
          },accessTokenSecret , {expiresIn : "15m"}) ; 
          const refreshToken = await jwt.sign({
            userInfo : {
                id : foundedUser._id
            },
          },refreshTokenSecret , {expiresIn : "7d"});

        res.cookie("jwt" , refreshToken , {
            httpOnly : true ,
            secure : true , 
            sameSite : "None" ,
            maxAge : 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({email : foundedUser.email , accessToken})
    }catch(err){
        return res.status(500).json({message : `Error in login user ${err.message}`})
    }
}
const refresh = async (req , res)=>{
    try{
        const cookies = req.cookies ; 
    if(!cookies?.jwt){
        return res.status(401).json({message : "unauthorized"})
    } 
    const refreshToken = cookies.jwt ; 
    await jwt.verify(refreshToken , refreshTokenSecret ,async(err , decoded) =>{
        const userId = decoded.userInfo.id ; 
        /* console.log(userId()*/
        if(err){
            return res.status(403).json({message : "Forbidden"})
        }
        const foundedUser = await User.findById(userId);
        if(!foundedUser) {
            return res.status(401).json({message : "unauthorized"})
        }
        const accessToken = await jwt.sign({
            userInfo : {
                id : foundedUser._id 
            }
        },accessTokenSecret , {expiresIn : "15m"})
        return res.status(200).json({accessToken})
    }) 

    }catch(err){
       return res.status(400).json({message : `Error in get new accessToken ${err}`})
    }
}
const logout = async (req , res)=>{
    // get cookies 
    const cookies = req.cookies ; 
    if(!cookies?.jwt){
        return res.sendStatus(204) ; 
    }
    res.clearCookie("jwt" , {
        httpOnly : true,
        secure : true,
        sameSite : "None"
    })  
    return res.json({message : "cookies cleared successfully"})

}
module.exports = { register , login , refresh , logout}