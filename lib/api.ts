// lib/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://autocontinent-uz.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
