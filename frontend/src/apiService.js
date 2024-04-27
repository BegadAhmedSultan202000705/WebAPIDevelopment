import axios from "axios";
import config from "./config";

// Create an instance of axios with the base URL
const apiClient = axios.create({
  baseURL: config.apiBaseUrl,
});

// Function to set the authorization token in the headers
function setAuthToken(token) {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
}

// Export the axios instance and setAuthToken function
export { apiClient, setAuthToken };
