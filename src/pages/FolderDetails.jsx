import  { React, useState, useEffect, } from "react"; 
import Title from "../components/Title";
import Navbar from "../components/Navbar";
import {getFolderById} from "../services/pages/FolderDetailsPageService.jsx"
import {Button, Container, Loader, Popup } from 'semantic-ui-react'
import './../statics/css/pages/FolderDetailsPageStyle.css'
import  AccordionExampleStandard from "../components/Accordion";

const FolderDetails = () => {
    const searchParams = new URLSearchParams(document.location.search)
    const [folderId, setFolderId] = useState('');
    const [loaderActive, setLoaderActive] = useState(false)

    useEffect(() => {
        getFolderDetails()
      }, []);

    const getFolderDetails = () => {
        getFolderById(searchParams.get("fd")).then(response => {
          console.log(response);
        })
    }  

    return (
            <div>
                 <Navbar/>
                  <Container className="content">
                        <Title title={"Folder Details"} />

                        <div className="fold-title">
                            <h1>Spring Boot</h1>
                         </div>
                         <div className="subject-btn-div">
                            <Button primary>New Subject</Button>
                         </div>
                         
                         <div className="subjects-list">
                            <AccordionExampleStandard/>
                         </div>                 
                  </Container>
            </div>
    )
} 

export default FolderDetails