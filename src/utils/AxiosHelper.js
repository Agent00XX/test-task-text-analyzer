import axios from "axios";
import { errorToast } from "./ToastHelper";

const API_URL = "http://localhost:8080/";
let source = axios.CancelToken.source();

const instance = axios.create({
  baseURL: `${API_URL}`,
  cancelToken: source.token,
});

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (axios.isCancel(error)) {
      console.log("axios request cancelled", error.message);
      return;
    }

    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 400:
          errorToast(error.response.data.message);
          return;
        case 401:
          errorToast("Your session has been expired. Please login again.");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          // window.location.href = "/";
          return;
        case 403:
          errorToast("You are not authorized to access this page");
          return;
        case 404:
        default:
          errorToast("Something went wrong. Please try again later.");
          return;
      }
    } else if (error.request) {
      console.log(error.request);
    } else {
      errorToast(error.message);
    }
  }
);

export default instance;
