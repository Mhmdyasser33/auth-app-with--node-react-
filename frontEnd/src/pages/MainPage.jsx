import { Link } from 'react-router-dom';
import styles from '../styles/MainPage.module.css'; 

export default function MainPage() {
  return (
    <div className={styles.mainPageContainer}>
      <h1> Authentication app with node js </h1>
      
      <div className={styles.actionLinks}>
        <p>
          <Link to="/auth/register" className={styles.link}>Register</Link>
        </p>
        <p>
          <Link to="/auth/login" className={styles.link}>Login</Link>
        </p>
      </div>
    </div>
  );
}
