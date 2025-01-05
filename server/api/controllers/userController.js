const User = require("../models/user")
const getAllUser = async (req , res)=>{
    try{
      const users = await User.find({}).select("-password") // to prevent password from appearance using - and attribute name
      if(!users.length){
        return res.status(400).json({message : "No users found"}) ;
      }
      return res.status(200).json(users);
    }catch(err){
      return res.status(500).json({message : err.message}) ;
    }
}

module.exports = {getAllUser,}