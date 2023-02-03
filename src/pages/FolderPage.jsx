import  { React, useState, useEffect, useRef } from "react"; 
import Title from "../components/Title";
import Navbar from "../components/Navbar";
import {getAllFolders} from "../services/pages/FolderPageService.jsx"
import  FolderCard from "../components/FolderCard";
import FolderModal from "../components/FolderModal";

import Btn from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { Button, Container,} from 'semantic-ui-react'
import './../statics/css/pages/FolderPageStyle.css'


const FolderPage = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
             <Navbar/>
        
            <Container className="content">

                <Title title={"Folder Collections"} />
                <div className="div-button">
                    <Button color='teal'  variant="primary" onClick={handleShow}>New Folder</Button>        
                </div>
               
                <div className="cards">
                     <FolderCard/>
                     <FolderCard/>
                     <FolderCard/>
                     <FolderCard/>
                     <FolderCard/>
                     <FolderCard/>
                     <FolderCard/>
                     <FolderCard/>
                     <FolderCard/>
                     <FolderCard/>
                     <FolderCard/>
                     <FolderCard/>
                </div>
               
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}
export default FolderPage