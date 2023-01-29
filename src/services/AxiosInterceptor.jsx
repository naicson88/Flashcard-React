import axios from "axios";
import { API_FLASHCARD } from "../constants";

const api = axios.create({
    baseURL: API_FLASHCARD,
    timeout: 30000,
  });
  
  api.interceptors.request.use(
    async (config) => {
      const basicAuthCredentials = btoa("naicson10" + ":" + "123456");
      config.headers.common["Authorization"] = "Basic " + basicAuthCredentials;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  export default api;