import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://segware-book-api.segware.io/api",
  timeout: 1000,
});

export default axiosInstance;
