import styles from "../../styles/ForgotPassword.module.css"

const Forgot_Password = () => {

  return (
    <div style={styles.container}>
      <h2>Forgot Password</h2>
      <p>Enter your email to reset your password.</p>
      <form  style={styles.form}>
        <input
          type="email"
          placeholder="Enter your email"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Send Reset Link
        </button>
      </form>
    </div>
  );
};




export default Forgot_Password;