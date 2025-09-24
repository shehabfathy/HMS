import axios from "axios";
import CookieService from "../../service/Cookies/Cookies"; // Adjust the import path as needed

// Create an Axios instance with a predefined base URL
const api = axios.create({
  baseURL: "https://upskilling-egypt.com:3000/api/v0",
});

// --- Request Interceptor ---
// This function will run before every request is sent.
// It checks if a token exists in cookies and, if so, attaches it to the
// 'Authorization' header. This automates sending the token for protected routes.
api.interceptors.request.use(
  (config) => {
    const token = CookieService.get("token");
    if (token) {
      // If the token exists, add it to the request headers
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

export default api;
