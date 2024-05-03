import React from "react";

export const Loader = () => {
  const loaderStyles = {
    background: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    container: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      width: "60px",
      height: "60px",
    },
    dot: {
      width: "15px",
      height: "15px",
      borderRadius: "50%",
      backgroundColor: "#fff",
      animation: "dotBounce 1.2s infinite",
    },
    dot1: {
      animationDelay: "-0.3s",
    },
    dot2: {
      animationDelay: "-0.2s",
    },
    dot3: {
      animationDelay: "-0.1s",
    },

    "@keyframes dotBounce": {
      "0%, 100%": {
        transform: "translateY(0)",
      },
      "50%": {
        transform: "translateY(-15px)",
      },
    },
  };

  return (
    <div style={loaderStyles.background}>
      <div style={loaderStyles.container}>
        <div style={{ ...loaderStyles.dot, ...loaderStyles.dot1 }}></div>
        <div style={{ ...loaderStyles.dot, ...loaderStyles.dot2 }}></div>
        <div style={{ ...loaderStyles.dot, ...loaderStyles.dot3 }}></div>
      </div>
    </div>
  );
};
