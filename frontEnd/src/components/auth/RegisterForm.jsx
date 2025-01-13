import { useState } from 'react';
import styles from '../../styles/SignupForm.module.css';
import apiRequest from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
const serverPath = "http://localhost:5000"; 

export default function RegisterForm() {
    const navigate = useNavigate() ; 
    const [userInputs, setUserInputs] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
               const res = await apiRequest({
                url: `${serverPath}/auth/register`,
                method: "POST",
                data: { 
                    first_name: userInputs.first_name,
                    last_name: userInputs.last_name,
                    email: userInputs.email,
                    password: userInputs.password
                }
            });
        
            setUserInputs({
                first_name: '',
                last_name: '',
                email: '',
                password: ''
            }) 
            toast.success("you are register as a newUser.!" , {
                position : "top-right",
            })
            setTimeout(() => {
                navigate("/auth/login") ; 
            }, 1000);

            return res;
        } catch (err) {
        console.log(`error in register user ${err}`) ; 
        }
    };
    return (
        <div>
            <form className={styles.signupForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="first_name">First Name</label>
                    <input type="text" id="first_name" name='first_name' value={userInputs.first_name} onChange={(e) => setUserInputs((prev) => {
                        return { ...prev, first_name: e.target.value }
                    })} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="last_name">Last Name</label>
                    <input
                        type="text"
                        id="last_name"
                        name='last_name'
                        required
                        value={userInputs.last_name}
                        onChange={(e) => setUserInputs((prev) => {
                            return { ...prev, last_name: e.target.value }
                        })}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name='email'
                        required
                        value={userInputs.email}
                        onChange={(e) => setUserInputs((prev) => {
                            return { ...prev, email: e.target.value }
                        })}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name='password'
                        required
                        value={userInputs.password}
                        onChange={(e) => setUserInputs((prev) => {
                            return { ...prev, password: e.target.value }
                        })}
                    />
                </div>
                <button type="submit">Register</button>
              
                <p style={{ textAlign: "center", fontSize: "20px", marginTop: "15px", marginRight: "10px" }}>
                  <Link to="/auth/login" className={styles.link}> login </Link>
                </p>
    

               
            </form>
            <ToastContainer/>
        </div>
    );
}