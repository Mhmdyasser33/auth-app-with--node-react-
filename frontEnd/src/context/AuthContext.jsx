import { createContext, useEffect, useState } from "react"
import Cookies from "js-cookie";
export const AuthContext = createContext() ; 
export default function AuthProvider({children}) {
    const [isAuthenticated , setIsAuthenticated] = useState(false) ; 
    const [accessToken , setAccessToken] = useState(null) ; 
    useEffect(()=>{
        const token = Cookies.get("accessToken") ;
        if(token){
            setAccessToken(token);
            setIsAuthenticated(true) ;
        }
    },[]) ; 

    const AuthDate = {isAuthenticated ,setIsAuthenticated,setAccessToken, accessToken} ; 
  return (
    <div>
        <AuthContext.Provider value={AuthDate}>
        {children}
        </AuthContext.Provider>
    </div>
  )
}
