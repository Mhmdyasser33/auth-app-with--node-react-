require("dotenv").config()
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken") ;
const crypto = require("crypto") ;
const nodeMailer = require("nodemailer")
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
    },accessTokenSecret , {expiresIn : "20d"}) ; 
   
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
          },accessTokenSecret , {expiresIn : "20d"}) ; 
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
        },accessTokenSecret , {expiresIn : "20d"})
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


const forgotPassword = async(req , res)=>{
    try{
        const { email } = req.body ;
        const user = await User.findOne({email}) ;
        if(!user){
            return res.status(400).json({message : "User not found"})
        }
 
         if(user.passwordResetToken && user.passwordExpirationToken > Date.now()){
            return res.status(400).json({message: "A reset email has already been sent." })
        }   

        const resetToken = crypto.randomBytes(32).toString("hex"); // generate token
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex") ; 
        user.resetPasswordToken = hashedToken
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000 ; 
        await user.save() ; 

        const transporter = nodeMailer.createTransport({
            service : "Gmail" , 
            auth : {
                user : process.env.USERNAME_EMAIL,
                pass : process.env.USERNAME_PASSWORD
            }
        })
        const resetLink = `http://localhost:4000/auth/reset-password/${resetToken}`;

        const mailOptions = {
            from : process.env.USERNAME_EMAIL , 
            to : email ,
            subject : "Password reset" ,
            text : `Click here to reset your password ${resetLink}`,
            html : `<a href="${resetLink}">Reset password </a>`
        }
        await transporter.sendMail(mailOptions) ; 
        return res.status(200).json({message : "Password reset link sent to email"});
        }catch(err){
            return res.status(500).json({ message: "Internal server error" });
            
        }
}
const resetPassword = async (req, res) => {
    try {
        console.log("Request received", req.query, req.body); 
        const { token } = req.params;
        const { newPassword } = req.body;

        if (!newPassword) {
            return res.status(400).json({ message: "newPassword field is required" });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({ message: "Password must be greater than 6 characters long" });
        }

        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
        console.log("Hashed token:", hashedToken);

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        console.log("User found:", user);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();
        return res.status(200).json({ message: "Password reset successful" });
    } catch (err) {
        console.error("Error during password reset:", err); 
        return res.status(500).json({ message: `Internal server error: ${err.message}` });
    }
};

module.exports = {register,login ,refresh,forgotPassword,resetPassword,logout};