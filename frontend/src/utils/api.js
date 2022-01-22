import axios from "axios";

//TODO: use env variables to hide api uri
const api = axios.create({
  baseURL: "https://client-provider-api.herokuapp.com",
  headers: {"Content-Type": "application/json", Accept: "application/json"},
});

export default api;
