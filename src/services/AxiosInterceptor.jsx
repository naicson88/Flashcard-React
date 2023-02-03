import axios from "axios";
import { API_FLASHCARD } from "../constants";

const instance = axios.create({
    baseURL: API_FLASHCARD,
    timeout: 30000,
    //withCredentials: true
  });
  
  instance.interceptors.request.use (
    config => {
      console.log("INTERCEPTOR")
    //  const basicAuthCredentials = btoa("naicson10" + ":" + "123456");
      config.headers["Authorization"] = "Basic bmFpY3NvbjEwOjEyMzQ1Ng"
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  export default instance;