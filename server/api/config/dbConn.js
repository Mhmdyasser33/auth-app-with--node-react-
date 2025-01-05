const mongoose = require("mongoose") ; 

const connextDb = async()=>{
    try{
     await mongoose.connect(process.env.DATABASE_URI) ; 
    }catch(err){
     console.log(`error in connecting db ${err}`) ; 
    }
}
module.exports = connextDb ;