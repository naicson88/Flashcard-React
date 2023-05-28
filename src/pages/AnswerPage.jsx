import  { React, useState, useEffect, } from "react"; 
import {Button, Container, Loader, Popup } from 'semantic-ui-react'
import Title from "../components/Title";
import Navbar from "../components/Navbar";
import FullScreenLoader from "../components/FullScreenLoader"
import './../statics/css/pages/AnswerPageStyle.css'

const AnswerPage = () => {
    const [fullScreenLoader, setFullScreenLoader] = useState(false);

    const handleShowAnswer = () => {
        let el = document.getElementsByClassName('answer-section')[0];
        el.style.height = 'auto'
        el.style.opacity = 1
    }

    return(
        <>
            <Navbar activeItem={'answer'}/>

            <Container className="content">
                <Title title={"Answer Questions"}/>               
                { fullScreenLoader && (<FullScreenLoader/>)}

                <div className="fold-title">
                    <h1>Spring Boot</h1>
                </div>

                <div className="answer-div">
                    <header>
                        <h3 style={{color: '#00BFFF'}}> Questions: 1 / 120</h3>
                    </header>
                    <div className="question-section">
                        <div className="subject-question">
                            subject name
                        </div>
                        <div className="question-box">
                            <p>Question</p>
                        </div>

                        <div className="button-answer">
                            <Button primary onClick={handleShowAnswer}>
                                Answer 
                            </Button>  

                            <Button color="orange" style={{marginLeft: '50px'}}>
                                Skip
                            </Button>  
                        </div>
                       
                    </div>

                    <div className="answer-section">
                         <div className="question-box" style={{backgroundColor: '#d7f7a8'}}>
                            <p>Question</p>
                        </div>
                        <div className="buttons-answer">
                            <Button positive >
                                Correct 
                            </Button>  
                            <Button color='yellow' >
                                Middle 
                            </Button>  
                            <Button color='red' >
                                Wrong 
                            </Button>  
                        </div>
                    </div>
                </div>

            </Container>  
        </>
    )
}

export default AnswerPage