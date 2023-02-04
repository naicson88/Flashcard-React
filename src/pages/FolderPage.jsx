import  { React, useState, useEffect, useRef } from "react"; 
import Title from "../components/Title";
import Navbar from "../components/Navbar";
import {getAllFolders, saveNewFolder} from "../services/pages/FolderPageService.jsx"
import  FolderCard from "../components/FolderCard";
import FolderModal from "../components/FolderModal";
import Paginations from "../components/Paginations"

//import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import {Button, Container,} from 'semantic-ui-react'
import './../statics/css/pages/FolderPageStyle.css'
import SuccessToastr from "../components/SuccessToastr.jsx";
import { Message } from 'semantic-ui-react'


const FolderPage = () => {
    const [show, setShow] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false)
    const [folders, setFolders] = useState([])
    
    const handleClose = () => setShow(false);
    const handleShow = () =>  setShow(true);

    // useEffect(() => { 
    //     const fetchData = async () => {
    //         const response = await getFolders(); 
            
    //         setFolders(response.data)
    //         console.log(folders)
    //       }
    //       fetchData() 
    // }, []);

    useEffect(() => {
        getAllFolders().then(response => {
          setFolders(response.data);
        });
      }, []);

    const getFolders = async () =>{ return await getAllFolders() };

    const saveFolder = async () => {
        var {fname, desc} = document.forms[0]
        const data =  await saveNewFolder(fname.value, desc.value)
        setShow(false)

        if(data.status === 201){
            setShowSuccess(true);
            setTimeout(() => { setShowSuccess(false)}, 4000);   
        }
        
    }

    return (
        <div>
             <Navbar/>
            
            <Container className="content">
              
                <Title title={"Folder Collections"} />
                <div className="div-button">
                    <Button color='teal'  variant="primary" onClick={handleShow}>New Folder</Button>        
                </div>

                { showSuccess && (
                    <div className="success-div">
                         <Message positive>
                            <Message.Header>Success!</Message.Header>
                            <p>
                            Your Folder was registered successfully
                            </p>
                        </Message>
                    </div>
                )}
                
                <div className="pagination">
                     <Paginations />
                </div>
               
                <div className="cards"> 
                    {  folders.map((folder, index) => <FolderCard key={index} folder={folder} /> ) }

                </div>
               
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Create Folder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form >
                        <div className="input-container">
                            <label>Folder Name</label>
                            <input type="text" name="fname" maxLength={30} required/>
                        </div> 
                        <div className="input-container">
                            <label>Description</label>
                            <input type="text" name="desc" maxLength={250} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={saveFolder}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
            
          
           
        </div>
    )
}
export default FolderPage