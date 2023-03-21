import  { React, useState, useEffect, } from "react"; 
import Title from "../components/Title";
import Navbar from "../components/Navbar";
import {getAllFolders, saveNewFolder, deleteFolder, editFolder} from "../services/pages/FolderPageService.jsx"
import  FolderCard from "../components/FolderCard";
import Paginations from "../components/Paginations"
import FullScreenLoader from "../components/FullScreenLoader"
import Modal from 'react-bootstrap/Modal';
import {Button, Container, Loader, Popup } from 'semantic-ui-react'
import './../statics/css/pages/FolderPageStyle.css'
import Toastr from "../components/Toastr.jsx";
import {createToastrObject} from './../utils/GeneralFunctions'

const FolderPage = () => {
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [folders, setFolders] = useState([]);
    const [pageData, setPageData] = useState({});
    const [editFolderObj, setEditFolderObj] = useState({});
    const [loaderActive, setLoaderActive] = useState(false)
    const [fullScreenLoader, setFullScreenLoader] = useState(false);
    const [saveShow, setSaveShow] = useState('form');
    const [toastrObject, setToastrObj] = useState({})

    const handleClose = () => { setShow(false); setShowEdit(false);}
    const handleShow = () =>  setShow(true);

    useEffect(() => {
        getFolderList();
      }, []);
    
    const getFolderList = () => {
        setFolders([])
        setLoaderActive(true)
        getAllFolders(null).then(response => {
        setFolders(response.data.content);
        setLoaderActive(false)
        setPageData(response.data)
        }).catch((error) => {
            console.log(error)
            setLoaderActive(false)
        }) ;
    }

    const saveFolder = async () => {
        var {fname, desc} = document.forms[0]
        setSaveShow('loader')
        const data =  await saveNewFolder(fname.value, desc.value)
        setShow(false)
        setSaveShow('form')
        if(data.status === 201){
            setToastrObj(createToastrObject('Success!', 'Your Folder was registered successfully', 'positive'));  
            setShowSuccess(true);
            setTimeout(() => { 
                setShowSuccess(false)            
            }, 4000);   
            getFolderList();
        } else {
            setToastrObj(createToastrObject('Error!', 'Something bad happened!', 'negative'));  
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

    const removeFolder = (e, index) => {
      //  setFullScreenLoader(true)
        let folderId = e.target.parentNode.parentNode.id;
        deleteFolder(folderId).then(response => {   
            folders.splice(folders.findIndex(f => f.id === folderId), 1);
         //   setFullScreenLoader(false);
            getFolderList();
        }).catch((error) => {
            console.log(error)
          //  setFullScreenLoader(false)
        }) ;;
    }

    const editFolderBtn = (e, index) => {
        setShowEdit(true);
        let folder = folders.find( f => f.id == e.target.parentNode.parentNode.id);
        setEditFolderObj(folder); 
        setShowEdit(true);
    }

    const saveEditFolder = () => {
        var {fname, desc} = document.forms[0];
        editFolderObj.name =  fname.value;
        editFolderObj.description = desc.value;

        editFolder(editFolderObj).then(response => {
            setShowEdit(false)
            setShowSuccess(true);      
            setTimeout(() => { setShowSuccess(false)}, 4000);   
            getFolderList();
           
        }).catch((error) =>{
            alert('Cannot edit folder');
            console.log(error);
        })
    } 

    const PopupExample = () => (
        <Popup content='Add users to your feed' trigger={<Button icon='add' />} basic on={'hover'}/>
      )

    return (
        <div>
             <Navbar/>

            <Container className="content">
              
                <Title title={"Folder Collections"} />
               
                { fullScreenLoader && (<FullScreenLoader/>)}
            
                { showSuccess && (
                    <div className="success-div">
                        <Toastr toastrObj={toastrObject} />
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

                    {  folders.map((folder, index) => <FolderCard key={index} folder={folder} removeFolder={removeFolder} editFolder={editFolderBtn} /> ) }

                </div>              
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                     <Modal.Title>Create Folder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {saveShow === 'form' && (
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

                    {saveShow === 'loader' && (
                          <Loader active={true} inline='centered' content="Loading..."/>
                    )}
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button color="red" onClick={handleClose}>
                        Close
                    </Button>
                    <Button color="green" onClick={saveFolder}>
                        Save Folder
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEdit} onHide={handleClose}>
                <Modal.Header closeButton>
                     <Modal.Title>Create Folder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {saveShow === 'form' && (
                        <form >
                            <div className="input-container">
                                <label>Folder Name</label>
                                <input type="text" name="fname" maxLength={30} defaultValue ={editFolderObj.name} required/>
                            </div> 
                            <div className="input-container">
                                <label>Description</label>
                                <input type="text" name="desc" maxLength={250} defaultValue ={editFolderObj.description} />
                            </div>
                        </form>
                    )}

                    {saveShow === 'loader' && (
                          <Loader active={true} inline='centered' content="Loading..."/>
                    )}
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button color="red" onClick={handleClose}>
                        Close
                    </Button>
                    <Button color="green" onClick={saveEditFolder}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default FolderPage