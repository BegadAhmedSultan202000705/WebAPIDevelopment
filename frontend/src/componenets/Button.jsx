import React from "react";
import { Loader } from "../util/Loader";

const Button = ({
  type = "button",
  text,
  onClick,
  className = "",
  disabled = false,
  isLoading = false,
}) => {
  const buttonStyles = {
    base: {
      padding: "10px 15px",
      border: "none",
      borderRadius: "5px",
      backgroundColor: "#007bff",
      color: "white",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      outline: "none",
    },
    disabled: {
      backgroundColor: "#cccccc",
      color: "#666666",
      cursor: "not-allowed",
    },
  };

  const buttonStyle = {
    ...buttonStyles.base,
    ...(disabled && buttonStyles.disabled),
  };

  const loaderStyle = {
    display: "inline-block",
    marginRight: "8px",
  };

  return (
    <button
      type={type}
      className={`app-button-component ${className}`}
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? <Loader style={loaderStyle} /> : text}
    </button>
  );
};

export default Button;
