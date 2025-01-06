import { useContext, useState } from 'react';
import styles from '../../styles/LoginForm.module.css';
import apiRequest from '../../services/api';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
const serverPath = 'http://localhost:5000';

export default function LoginForm() {
    const { setIsAuthenticated, setAccessToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!userInput.email || !userInput.password) {
                alert('All fields are required');
                return;
            }
            const res = await apiRequest({
                url: `${serverPath}/auth/login`,
                method: 'POST',
                data: {
                    email: userInput.email,
                    password: userInput.password,
                },
            });
            setIsAuthenticated(true);
            Cookies.set('accessToken', res.accessToken);
            setAccessToken(res.accessToken);
            navigate('/users');
        } catch (err) {
            console.log(`Error in login ${err}`);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <h2 className={styles.formTitle}>Login</h2>
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={userInput.email}
                        className={styles.input}
                        onChange={(e) =>
                            setUserInput((prev) => ({
                                ...prev,
                                email: e.target.value,
                            }))
                        }
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        required
                        value={userInput.password}
                        className={styles.input}
                        onChange={(e) =>
                            setUserInput((prev) => ({
                                ...prev,
                                password: e.target.value,
                            }))
                        }
                    />
                </div>
                <button type="submit" className={styles.loginButton}>
                    Login
                </button>
            </form>
        </div>
    );
}
