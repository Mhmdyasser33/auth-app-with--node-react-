import { useState } from "react";
import styles from "../../styles/ResetPassword.module.css";
import apiRequest from "../../services/api";
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useSearchParams } from "react-router-dom";


const serverPath = `http://localhost:5000`
const Reset_Password = () => {
  const navigate = useNavigate() ; 
  const [newPassword , setNewPassword] = useState("") ; 
  const [error , setError] = useState("") ; 
  const [searchParams] = useSearchParams() ;
  const handleResetPassword = async (e)=>{
    const token = searchParams.get("token") ; 
    try{
      if(!newPassword){
        toast.error("newPassword field are require" , {
          position : "top-right" 
        })
        return ;
      }
      e.preventDefault(); 
      const response = await apiRequest({
        url : `${serverPath}/auth/reset-password` ,
        method : "POST" ,  
        data :  {
          newPassword
        },
        params : {
          token
        }
      })
       toast.success("password reset successfully ,i will redirect you to login page to login with a newPassword" , {
        position : "top-right"
       })
       setTimeout(() => {
            navigate("/auth/login");
       }, 1000);
    }catch(err){ 
        setError(`Error ${err.message || "in Reset password"}`) ; 
    }
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Reset Password</h2>
      <form className={styles.form} onSubmit={handleResetPassword}>
        <label className={styles.label} htmlFor="password">
          New Password:
        </label>
        <input
          type="password"
          id="password"
          className={styles.input}
          value={newPassword}
          onChange={(e)=> setNewPassword(e.target.value)}
          placeholder="Enter new password"
        />
        <button type="submit" className={styles.button}>
          Reset Password
        </button>
      </form>
      {error ? <p>{error}</p> : ""}
      <ToastContainer/>
    </div>
  );
};

export default Reset_Password;
