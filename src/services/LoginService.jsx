import { API_FLASHCARD } from "../constants";
import axios from "axios";

export default {

    doLogin(user){
        axios.post(API_FLASHCARD+"/user/login", user)
        .then((response) => {
            console.log(response);
        })
        .catch( (error) => {
            throw error;
        })
    }
}