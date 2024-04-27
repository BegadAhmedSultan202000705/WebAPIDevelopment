import React, { useEffect } from "react";
import { apiClient, setAuthToken } from "../apiService";
import config from "../config";

function MyComponent() {
  useEffect(() => {
    // Get the token from localStorage
    const token = localStorage.getItem("token");

    // Set the token in the axios client
    setAuthToken(token);

    // Make an API request using the axios client
    apiClient
      .get("/recipes")
      .then((response) => {
        // Handle the response
        console.log("Recipes:", response.data);
      })
      .catch((error) => {
        // Handle the error
        console.error("Error fetching recipes:", error);
      });
  }, []);

  return <div>{/MyComponent}</div>;
}

export default MyComponent;
