import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "../storing/noti_bar";
import { selectToastContent } from "../help/select";

function Toast() {
  const dispatch = useDispatch();
  const { toastStatus, toastMessage } = useSelector(selectToastContent);

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (toastStatus && toastMessage) {
      setShowToast(true);
      const timer = setTimeout(() => {
        setShowToast(false);
        dispatch(setToast({ status: null, displayMessage: null }));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toastStatus, toastMessage, dispatch]);

  const styles = {
    toastContainer: {
      position: "fixed",
      top: "10px",
      right: "10px",
      zIndex: 1000,
      opacity: showToast ? 1 : 0,
      transition: "opacity 0.5s ease",
    },
    toastMessage: {
      padding: "10px 20px",
      borderRadius: "5px",
      backgroundColor: getBackgroundColor(toastStatus),
      color: toastStatus === "warning" ? "#333" : "#fff",
      fontSize: "14px",
      maxWidth: "300px",
    },
  };

  function getBackgroundColor(status) {
    switch (status) {
      case "success":
        return "green";
      case "error":
        return "red";
      case "warning":
        return "yellow";
      case "info":
        return "blue";
      default:
        return "#333";
    }
  }

  return (
    <div style={styles.toastContainer} className={toastStatus}>
      <div style={styles.toastMessage}>{toastMessage}</div>
    </div>
  );
}

export default Toast;
