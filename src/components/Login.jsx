import React, { useState } from "react";
import { Button } from 'semantic-ui-react'
//import LoginService from "../services/LoginService";
import {doLogin} from "../services/pages/LoginService";
import { useHistory } from 'react-router-dom';
import "../statics/css/components/LoginStyle.css";

const Login = () => {

    const [errorMessages, setErrorMessages] = useState({})
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [userData, setUserData] = useState({})
    const history = useHistory();

    const renderErrorMessage = (name) => {
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        )
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        var {username, password} = document.forms[0]

       const userData = await doLogin(username.value, password.value);
       if(userData.status === 200){
            setIsSubmitted(true)
           history.push('/home')
       }
           
    }

    const errors = {
        username: "Invalid Username",
        password: "Invalid Password"
    }

    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username</label>
                    <input type="text" name="username" required/>
                    {renderErrorMessage("username")}
                </div> 
                <div className="input-container">
                    <label>Password</label>
                    <input type="password" name="password" required />
                    {renderErrorMessage("password")}
                </div>
                <div className="button-container">
                    <Button type='submit'>Submit</Button>
                </div>
            </form>
        </div>
    );

    return (
        <div className="div-form">
            <div className="login-form">
                <div className="title"> Sign In</div>
                {isSubmitted ? <div> User is successfully logged in </div> : renderForm}
            </div>
        </div>
    )
}

export default Login