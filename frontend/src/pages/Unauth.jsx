import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../componenets/Button";

const UnauthorizedPage = ({ path = "/", displayMessage = "" }) => {
  const navigate = useNavigate();

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      padding: "20px",
      backgroundColor: "#f8f9fa",
    },
    header: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "10px",
      color: "#343a40",
    },
    promptText: {
      fontSize: "16px",
      marginBottom: "20px",
      color: "#495057",
    },
    button: {
      width: "50%",
      padding: "10px",
      border: "none",
      outline: "none",
      fontSize: "16px",
      color: "#fff",
      backgroundColor: "#5f27cd",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
  };

  const handleButtonClick = () => {
    navigate(path);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Unauthorized Access</h1>
      <p style={styles.promptText}>{displayMessage}</p>
      <Button
        text="Go Back"
        onClickEvent={handleButtonClick}
        style={styles.button}
      />
    </div>
  );
};

export default UnauthorizedPage;
