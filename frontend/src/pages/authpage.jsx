import React, { useState } from "react";
import Button from "../componenets/Button.jsx";
import LoginForm from "../pages/Login";
import SignupForm from "../pages/Register";

const styles = {
  formBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  formContainer: {
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    maxWidth: "400px",
    width: "100%",
  },
  buttonBox: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  activeButton: {
    padding: "10px 20px",
    borderRadius: "5px",
    backgroundColor: "#4caf50",
    color: "#ffffff",
    cursor: "pointer",
    border: "none",
    transition: "background-color 0.3s",
  },
  inactiveButton: {
    padding: "10px 20px",
    borderRadius: "5px",
    backgroundColor: "#e0e0e0",
    color: "#000000",
    cursor: "pointer",
    border: "none",
    transition: "background-color 0.3s",
  },
};

const AuthenticationPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = (showLogin) => setIsLogin(showLogin);

  return (
    <div style={styles.formBox}>
      <div style={styles.formContainer}>
        <div style={styles.buttonBox}>
          <Button
            type="button"
            onClick={() => toggleForm(true)}
            style={isLogin ? styles.activeButton : styles.inactiveButton}
            text="Already have an account"
          />
          <Button
            type="button"
            onClick={() => toggleForm(false)}
            style={isLogin ? styles.inactiveButton : styles.activeButton}
            text="Register"
          />
        </div>
        {isLogin ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
};

export default AuthenticationPage;
