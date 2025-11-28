import axios from "axios";

const API = axios.create({
  baseURL: "https://ass-xag6.onrender.com",
  timeout: 10000
});

export default API;
