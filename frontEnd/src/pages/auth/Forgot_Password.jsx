import { useState } from "react";
import classNames from "../../styles/ForgotPassword.module.css" ; 
/* import apiRequest from "../../services/api"; */
import { toast, ToastContainer } from 'react-toastify';
import apiRequest from "../../services/api";
const serverPath = "http://localhost:5000"
const ForgotPassword = () => {
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
        toast.success(response.message , {
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
    <div className={classNames.container}>
      <h2 className={classNames.header}>Forgot Password</h2>
      <form className={classNames.form} onSubmit={handleForgotPassword}>
        <label className={classNames.label} htmlFor="email">
          Enter your email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className={classNames.input}
          placeholder="Enter your email"
        />
        <button type="submit"  className={classNames.button}>
          Send Reset Link
        </button>
        {error ? <p> {error}</p> : ""}
      </form>
      <ToastContainer/> 
    </div>
  );
};



export default ForgotPassword;
