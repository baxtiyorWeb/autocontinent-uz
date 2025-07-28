// lib/axios.ts
import axios from "axios";

const getAccessToken = () => {
  if (typeof window !== "undefined") {
    const userDataString = localStorage.getItem("UserData");
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        console.log("Parsed UserData in getAccessToken:", userData); // Debugging uchun

        // Access tokenni to'g'ri yo'ldan olish: userData.access
        return userData?.access; // <--- O'ZGARTIRILGAN QISM ('.data' olib tashlandi)
      } catch (e) {
        console.error("Error parsing UserData in getAccessToken:", e);
        localStorage.removeItem("UserData");
        return undefined;
      }
    }
  }
  return undefined;
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Access tokenni olish
  },
});

// So'rov interseptorini qo'shish
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          // Access tokenni to'g'ri yo'ldan olish: userData.access
          console.log("AccessToken in interceptor:", accessToken); // Debugging uchun

          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          } else {
            delete config.headers.Authorization;
          }
        } else {
          delete config.headers.Authorization;
        }
      } catch (e) {
        console.error(
          "Error parsing UserData from localStorage in interceptor:",
          e
        );
        localStorage.removeItem("UserData");
        delete config.headers.Authorization;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
