import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../storing/auth";
import { setToast } from "../storing/noti_bar";
import { userLogin } from "../api";
import Button from "../componenets/Button";
import { Loader } from "../util/Loader";
import { fieldValidation } from "../help/validate";

const defaultUserCredentials = {
  email: "",
  password: "",
};

const defaultError = {};

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userCredentials, setUserCredentials] = useState(
    defaultUserCredentials
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(defaultError);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleEmail = (e) => {
    setUserCredentials((prev) => ({ ...prev, email: e.target.value }));
  };

  const handlePassword = (e) => {
    setUserCredentials((prev) => ({ ...prev, password: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isDataValid, field, msg } = fieldValidation(userCredentials);
    if (!isDataValid) {
      setErrors({ [field]: msg });
      return;
    }

    setIsLoading(true);
    try {
      const res = await userLogin(userCredentials);
      if (res.ok) {
        const { userData, accessToken, msg } = await res.json();
        dispatch(setLogin({ accessToken, userData }));
        localStorage.setItem("accessToken", JSON.stringify(accessToken));
        localStorage.setItem("userData", JSON.stringify(userData));
        navigate("/home");
        return;
      } else {
        const { msg } = await res.json();
        dispatch(setToast({ status: "failure", displayMessage: msg }));
      }
    } catch (error) {
      dispatch(
        setToast({ status: "failure", displayMessage: JSON.stringify(error) })
      );
    }

    setErrors(defaultError);
    setIsLoading(false);
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      {/* Email field */}
      <div className="field-box">
        <label htmlFor="email" className="input-label">
          Email
        </label>
        <input
          id="email"
          type="text"
          value={userCredentials.email}
          onChange={handleEmail}
          className={`input-field ${errors.email ? "error-box" : ""}`}
          placeholder="Email"
        />
        {errors.email && <span className="input-error">{errors.email}</span>}
      </div>

      {/* Password field */}
      <div className="password-container field-box">
        <label htmlFor="password" className="input-label">
          Password
        </label>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          value={userCredentials.password}
          onChange={handlePassword}
          className={`input-field ${errors.password ? "error-box" : ""}`}
          placeholder="Password"
        />
        {/* Toggle password visibility icon */}
        <span
          className={`sign-in-pass ${errors.password ? "error-icon" : ""} ${
            showPassword ? "icon-eye" : "icon-eye-slash"
          }`}
          onClick={togglePasswordVisibility}
        ></span>
        {errors.password && (
          <span className="input-error">{errors.password}</span>
        )}
      </div>

      {/* Login button and Loader */}
      {!isLoading ? (
        <Button
          type="submit"
          text="Log In"
          className="common-button field-box"
        />
      ) : (
        <Loader />
      )}
    </form>
  );
};

const styles = {
  form: {
    padding: "16px 0 0",
    display: "flex",
    flexDirection: "column",
  },
  fieldBox: {
    marginBottom: "12px",
  },
  inputLabel: {
    fontSize: "12px",
    fontWeight: "bold",
    color: "#4f5052",
    textTransform: "uppercase",
    marginBottom: "8px",
    display: "block",
  },
  inputField: {
    width: "100%",
    borderRadius: "8px",
    height: "40px",
    padding: "6px 12px",
    border: "1px solid #eff0f2",
    outline: "none",
  },
  inputFieldFocus: {
    border: "1px solid #919295",
  },
  inputError: {
    color: "#da1e28",
    paddingTop: "5px",
    fontSize: "12px",
  },
  passwordContainer: {
    position: "relative",
  },
  signInPass: {
    position: "absolute",
    top: "50%",
    right: "12px",
    transform: "translateY(-50%)",
    fontSize: "14px",
    cursor: "pointer",
  },
  commonButton: {
    width: "100%",
    backgroundColor: "white",
    border: "1px solid #2c2d2e",
    color: "#2c2d2e",
    borderRadius: "8px",
    padding: "10px",
    fontWeight: "bold",
  },
  commonButtonHover: {
    backgroundColor: "#2c2d2e",
    color: "white",
    cursor: "pointer",
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default LoginForm;
