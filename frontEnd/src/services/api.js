
const apiRequest = async({url , method , data = null , headers = {} , credentials = "include" , accessToken = null})=>{
   try{
     const requestOptions = {
        method , 
        headers : {
            "Content-Type": "application/json" ,
            ...headers 
        } ,
        credentials , 
     }
     if(accessToken){
        requestOptions.headers.Authorization = `Bearer ${accessToken}`
     }
     if(data){
        requestOptions.body = JSON.stringify(data) ; 
     }
      // send a request
      const response = await fetch(url , requestOptions) ; 
      if(!response.ok){
       throw new Error("error in request") ; 
      } 
      const res = await response.json() ; 
      return res ; 
   }catch(err){
    console.error(`API Request Error: ${err.message}`);
   }
}

export default apiRequest ; 