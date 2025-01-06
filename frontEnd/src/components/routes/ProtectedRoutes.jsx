import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Navigate, useLocation } from "react-router-dom";
export default function ProtectedRoutes({children}) {
    const location = useLocation() ;
    const {isAuthenticated} = useContext(AuthContext) ;
    if(!isAuthenticated){
        return <Navigate to={'/auth/login'} state={{from : location}} replace/>
    }
  return children ; 
}
