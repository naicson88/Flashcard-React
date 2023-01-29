import { API_FLASHCARD } from "../constants";
import axios from "axios";

export default {

    doLogin(){
        axios.post(API_FLASHCARD+"/user/login", {}, {
            auth: {
                username: 'naicson10',
                password: '12356' 
            }
        })
        .then((response) => {
            console.log(response);
        })
        .catch( (error) => {
            throw error;
        })
    }
}