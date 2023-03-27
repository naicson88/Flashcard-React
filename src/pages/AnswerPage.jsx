import  { React, useState, useEffect, } from "react"; 
import {Button, Container, Loader, Popup } from 'semantic-ui-react'
import Title from "../components/Title";
import Navbar from "../components/Navbar";
import FullScreenLoader from "../components/FullScreenLoader"
import './../statics/css/pages/AnswerPageStyle.css'

const AnswerPage = () => {
    const [fullScreenLoader, setFullScreenLoader] = useState(false);

    return(
        <>
            <Navbar activeItem={'answer'}/>

            <Container className="content">
                <Title title={"Answer Questions"}/>               
                { fullScreenLoader && (<FullScreenLoader/>)}

                <div className="main-div-sides">
                    <div className="left-side">
                        <div className="div-folders">
                            <p>teste</p>
                        </div>
                    </div>
                  
                    <div className="right-side">
                        <p>teste</p>
                    </div>
                </div>

            </Container>
              
        
        </>
    )
}

export default AnswerPage