import axios from "axios";

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URI,
  headers: {"Content-Type": "application/json", Accept: "application/json"},
});

export default api;
