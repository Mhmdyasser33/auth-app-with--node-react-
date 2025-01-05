import { useState } from 'react'
import styles from '../../styles/LoginForm.module.css'
import apiRequest from '../../services/api';
import { useNavigate } from 'react-router-dom';
const serverPath = "http://localhost:5000";
export default function LoginForm() {
    const navigate = useNavigate() ; 
    const [userInput , setUserInput] = useState({
        email : '',
        password : ''
    })


    const handelSubmit = async(e)=>{
        e.preventDefault() ; 
        try{
            if(!userInput.email || !userInput.password ){
                alert("all field are required") ; 
            }
            const res = await apiRequest({
                url  : `${serverPath}/auth/login`,
                method : "POST" ,
                data : {
                    email : userInput.email,
                    password : userInput.password
                }
                
            }) 
            navigate("/users") ;       

        }catch(err){
            /* console.log(`error in login ${err}`) */
        }
    }
  return (
    <form className={styles.loginForm} onSubmit={handelSubmit}>
        <div>
        <label htmlFor="email"> Email </label>
        <input type="email" id="email" name='email' required value={userInput.email} onChange={(e) => setUserInput((prev)=>{
            return {...prev , email : e.target.value} 
        })}/>
        </div>
       <div>
       <label htmlFor="password">Password</label>
        <input
            type="password" id="password" required value={userInput.password} onChange={(e) => setUserInput((prev)=>{
                return {...prev , password : e.target.value}
            })}/>
       </div>
       
   
    <button type="submit">Login</button>
</form>
  )
}
