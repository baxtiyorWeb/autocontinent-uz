// lib/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://avtokontinent-uz.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
