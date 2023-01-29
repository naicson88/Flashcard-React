import React, { useState } from "react";
import { Button } from 'semantic-ui-react'
import LoginService from "../services/LoginService";
import "../statics/css/LoginStyle.css";

const Login = () => {

    const [errorMessages, setErrorMessages] = useState({})
    const [isSubmitted, setIsSubmitted] = useState(false)

    const renderErrorMessage = (name) => {
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        )
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        var {username, password} = document.forms[0]

       const userData = LoginService.doLogin(); 

       console.log(userData)

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