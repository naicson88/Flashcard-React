import { API_FLASHCARD } from "../../constants";
import axios from "axios";
import interceptor from "../AxiosInterceptor"



    export const doLogin = async (username, password) => {
        return await axios.post(API_FLASHCARD+"/user/login", {}, {
             //params: params,
            // withCredentials: true,
             auth: {
                 username : username,
                 password : password
             }
         })
     }


