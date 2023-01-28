import React, { useState } from "react";
import { Button } from 'semantic-ui-react'
import axios from "axios";
import { API_FLASHCARD } from "./Constants";

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
    }

    const errors = {
        username: "Invalid Username",
        password: "Invalid Password"
    }

    return  (
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
}

export default Login