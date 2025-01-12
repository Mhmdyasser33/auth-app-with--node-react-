import { useState } from "react";
import className from "../../styles/ForgotPassword.module.css" ; 
/* import apiRequest from "../../services/api"; */
import { toast, ToastContainer } from 'react-toastify';
import apiRequest from "../../services/api";
const serverPath = "http://localhost:5000"
const Forgot_Password = () => {
  const [email , setEmail] = useState("") ;
  const [error] = useState("") ; 

  const handleForgotPassword = async(e)=>{
    e.preventDefault();
    try{
      if(!email){
        toast.error("Email field are required" , {
          position : "top-right" 
         })
        return ;
      }
        
      const response = await apiRequest({
        url : `${serverPath}/auth/forgot-password` , 
        method : "POST" ,
        data : {email,}
      })
        toast.success(`${response.message} go to your email to Reset it` , {
          position : "top-right" 
         })
         setEmail(""); 
         return;
       
    }catch(err){
        toast.error(`error in reset password ${err.message} || ${err}`,{
          position : "top-right"
        }
        )
    }
  }
  return (
    <div className={className.container}>
      <h2 className={className.header}>Forgot Password</h2>
      <form className={className.form} onSubmit={handleForgotPassword}>
        <label className={className.label} htmlFor="email">
          Enter your email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className={className.input}
          placeholder="Enter your email"
        />
        <button type="submit"  className={className.button}>
          Send Reset Link
        </button>
        {error ? <p> {error}</p> : ""}
      </form>
      <ToastContainer/> 
    </div>
  );
};
export default Forgot_Password;
