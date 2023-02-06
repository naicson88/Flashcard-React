import  { React, useState, useEffect, useRef } from "react"; 
import Title from "../components/Title";
import Navbar from "../components/Navbar";
import {getAllFolders, saveNewFolder, deleteFolder} from "../services/pages/FolderPageService.jsx"
import  FolderCard from "../components/FolderCard";
import FolderModal from "../components/FolderModal";
import Paginations from "../components/Paginations"
import FullScreenLoader from "../components/FullScreenLoader"

//import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import {Button, Container, Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import './../statics/css/pages/FolderPageStyle.css'
import SuccessToastr from "../components/SuccessToastr.jsx";
import { Message } from 'semantic-ui-react'


const FolderPage = () => {
    const [show, setShow] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false)
    const [folders, setFolders] = useState([])
    const [pageData, setPageData] = useState({})
    const [loaderActive, setLoaderActive] = useState(false)
    const [fullScreen, setFullScree] = useState(false)
    const [saveShow, setSaveShow] = useState('form')
    
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
        setLoaderActive(true)
        getAllFolders(null).then(response => {
          setFolders(response.data.content);
          setLoaderActive(false)
          setPageData(response.data)
        }).catch((error) => {
            console.log(error)
            setLoaderActive(false)
        }) ;
      }, []);

    const saveFolder = async () => {
        var {fname, desc} = document.forms[0]
        setSaveShow('loader')
        const data =  await saveNewFolder(fname.value, desc.value)
        setShow(false)
        setSaveShow('form')
        if(data.status === 201){
            setShowSuccess(true);
            setTimeout(() => { setShowSuccess(false)}, 4000);   
        }      
    }

    const pageChange = (e, pageInfo) => {
        //console.log(pageInfo)
        setFolders([]);
        setLoaderActive(true)
        getAllFolders(pageInfo.activePage - 1).then(response => {          
            setFolders(response.data.content);
            setLoaderActive(false)
            setPageData(response.data)
          }).catch((error) => {
            console.log(error)
            setLoaderActive(false)
        }) ;;
    }

    const removeFolder = (e, info) => {
        setFullScree(true)
        deleteFolder(e.target.parentNode.parentNode.id).then(response => {
            setFullScree(false)
        }).catch((error) => {
            console.log(error)
            setFullScree(false)
        }) ;;
    }

    return (
        <div>
             <Navbar/>
            
            <Container className="content">
              
                <Title title={"Folder Collections"} />
                
                { fullScreen && (<FullScreenLoader/>)}
            
                { showSuccess && (
                    <div className="success-div">
                        <SuccessToastr title={"Success!!"} message={"Your Folder was registered successfully"}/>
                    </div>                   
                )}
                
                <div className="div-button">
                    <Button color='teal'  variant="primary" onClick={handleShow}>New Folder</Button>        
                </div>
                    
               
                <div className="pagination">
                     <Paginations totalPages={pageData.totalPages} pageChange={pageChange}/>
                </div>

                <div className="cards"> 

                     <Loader active={loaderActive} inline='centered' content="Loading..."/>

                    {  folders.map((folder, index) => <FolderCard key={index} folder={folder} removeFolder={removeFolder}/> ) }

                </div>
               
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Create Folder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {saveShow == 'form' && (
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
                    )}

                    {saveShow == 'loader' && (
                          <Loader active={true} inline='centered' content="Loading..."/>
                    )}
                    
                </Modal.Body>
                <Modal.Footer>
                <Button color="red" onClick={handleClose}>
                    Close
                </Button>
                <Button color="green" onClick={saveFolder}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
            
          
           
        </div>
    )
}
export default FolderPage