import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setToast } from "../storing/noti_bar";
import { userSignup } from "../api";
import Button from "../componenets/Button";
import { fieldValidation } from "../help/validate";
import { Loader } from "../util/Loader";

const defaultUserData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const defaultError = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState(defaultUserData);
  const [errors, setErrors] = useState(defaultError);

  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleUserInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrors(defaultError);
    const validationResults = fieldValidation(userData);

    if (!validationResults.isDataValid) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [validationResults.field]: validationResults.msg,
      }));
      return;
    }

    setIsLoading(true);
    try {
      const res = await userSignup(userData);
      if (res.ok) {
        dispatch(
          setToast({
            status: "success",
            displayMessage:
              "Congratulations! Your account has been created. Try log in.",
          })
        );
        setUserData(defaultUserData);
        setErrors(defaultError);
      } else {
        const responseData = await res.json();
        dispatch(
          setToast({
            status: "failure",
            displayMessage:
              responseData.msg || "Failed to register. Please try again.",
          })
        );
      }
    } catch (err) {
      console.error("Signup API error:", err);
      dispatch(
        setToast({
          status: "failure",
          displayMessage: "An error occurred. Please try again later.",
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div style={{ marginBottom: "12px" }}>
        <label htmlFor="fullname">Full Name</label>
        <input
          id="fullname"
          type="text"
          name="name"
          value={userData.name}
          onChange={handleUserInputChange}
          style={{ borderColor: errors.name ? "#da1e28" : "#eff0f2" }}
        />
        {errors.name && <span>{errors.name}</span>}
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={userData.email}
          onChange={handleUserInputChange}
          style={{ borderColor: errors.email ? "#da1e28" : "#eff0f2" }}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          name="password"
          value={userData.password}
          onChange={handleUserInputChange}
          style={{ borderColor: errors.password ? "#da1e28" : "#eff0f2" }}
        />
        <span onClick={togglePasswordVisibility}>
          {showPassword ? "Hide" : "Show"}
        </span>
        {errors.password && <span>{errors.password}</span>}
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label htmlFor="confirmPass">Confirm Password</label>
        <input
          id="confirmPass"
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          value={userData.confirmPassword}
          onChange={handleUserInputChange}
          style={{
            borderColor: errors.confirmPassword ? "#da1e28" : "#eff0f2",
          }}
        />
        <span onClick={togglePasswordVisibility}>
          {showPassword ? "Hide" : "Show"}
        </span>
        {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
      </div>

      {!isLoading ? (
        <Button
          type="submit"
          className="common-button"
          text="Sign Up"
          disabled={Object.values(errors).some((error) => error)}
        />
      ) : (
        <Loader />
      )}
    </form>
  );
};

export default SignupForm;
