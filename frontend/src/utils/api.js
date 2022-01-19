import axios from "axios";

const httpClient = axios.create({
  baseURL: "https://client-provider-api.herokuapp.com",
  headers: {"Content-Type": "application/json", Accept: "application/json"},
});

export default httpClient;
