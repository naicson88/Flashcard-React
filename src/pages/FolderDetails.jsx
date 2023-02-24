import  { React, useState, useEffect, } from "react"; 
import Title from "../components/Title";
import Navbar from "../components/Navbar";
import {Button, Container, Loader, Popup } from 'semantic-ui-react'
import './../statics/css/pages/FolderDetailsPageStyle.css'
import  AccordionExampleStandard from "../components/Accordion";

const FolderDetails = () => {
    const searchParams = new URLSearchParams(document.location.search)
    const [folderId, setFolderId] = useState('');
   // const [searchParams] = useSearchParams();

    useEffect(() => {
        setFolderId(searchParams.get("fd"))
        console.log(searchParams.get("fd"))
      }, []);

    return (
            <div>
                 <Navbar/>
                  <Container className="content">
                        <Title title={"Folder Details"} />

                        <div className="fold-title">
                            <h1>Spring Boot</h1>
                         </div>

                        <AccordionExampleStandard/>
                  </Container>

               
            </div>
    )
} 

export default FolderDetails