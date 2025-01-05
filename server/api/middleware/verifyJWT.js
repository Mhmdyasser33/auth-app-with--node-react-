const jwt = require("jsonwebtoken")
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

const verifyJWT = async(req , res , next) =>{
    try{
        const token =  await req.headers.authorization || req.headers.Authorization;
       
        if(!token?.startsWith("Bearer ")){
            return res.status(401).json({message : "unauthorized"}) 
        }
        const extractToken = token.split(" ")[1] ; 
        await jwt.verify(extractToken , accessTokenSecret , async (err , decoded) =>{
        // error may be incorrect token or expired token 
          if(err) return res.status(403).json({message : "forbidden"}) 
            req.userId = decoded.userInfo.id ;
        })
        next() 
    }catch(err){
      return res.status(400).json({message : `error in verify token ${err}`})
    }
}
module.exports = verifyJWT ; 
/**
 * import notes 
 * this middleware will be executed before get user ? to test if user login  so can access users else no..
 */