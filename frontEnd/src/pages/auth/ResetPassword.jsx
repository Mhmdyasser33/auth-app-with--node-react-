import { useState } from "react";
import styles from "../../styles/ResetPassword.module.css"

const Reset_Password = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Password reset successfully!");
  };

  return (
    <div style={styles.container}>
      <h2>Reset Password</h2>
      <p>Enter your new password.</p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default Reset_Password;