import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import styles from "../../styles/ResetPassword.module.css"
const serverPath = "http://localhost:5000";
const Reset_Password = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');

    if (!newPassword) {
      toast.error('New password field is required', { position: 'top-right' });
      return;
    }

    try {
      const response = await fetch(`${serverPath}/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          'Password reset successfully. Redirecting to login page...',
          { position: 'top-right' }
        );
        setTimeout(() => {
          navigate('/auth/login');
        }, 1000);
      } else {
        setError(data.message || 'Error resetting password');
        toast.error(data.message || 'Error resetting password', {
          position: 'top-right',
        });
      }
    } catch (err) {
      setError(`Error: ${err.message || 'Error resetting password'}`);
      toast.error(`Error: ${err.message || 'Error resetting password'}`, {
        position: 'top-right',
      });
    }
  };

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
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          required
        />
        <button type="submit" className={styles.button}>
          Reset Password
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      <ToastContainer />
    </div>
  );
};

export default Reset_Password;
