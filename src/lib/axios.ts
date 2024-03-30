import axios from "axios";
import Cookies from "js-cookie";

// ============== API URL ==============

export const API =
  import.meta.env.MODE === "development"
    ? "http://localhost:4000"
    : "https://api.bluewash.sa";

const axiosInstance = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
});

// ============== Cookie Delete When 401 ==============
// Response interceptor to handle 401 Unauthorized responses
axiosInstance.interceptors.response.use(
  (response) => {
    // If the response is successful, just return the response
    return response;
  },
  (error) => {
    // If the response is 401, remove the JWT token
    if (error.response && error.response.status === 401) {
      Cookies.remove("jwt"); // Remove the JWT token from cookies
      // Optional: Redirect user to login page or perform another action
    }
    return Promise.reject(error);
  },
);

// ============== Send Token with every request ==============

axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the JWT token from cookies
    const token = Cookies.get("jwt");
    // If the token exists, append it to the authorization header
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);
export default axiosInstance;
