import  { React, useState, useEffect, } from "react"; 
import Title from "../components/Title";
import Navbar from "../components/Navbar";
import {getFolderById, saveSubject} from "../services/pages/FolderDetailsPageService.jsx"
import {Button, Container, Loader} from 'semantic-ui-react'
import './../statics/css/pages/FolderDetailsPageStyle.css'
import  ItemSubject from "../components/ItemSubject";
import Modal from 'react-bootstrap/Modal';
import FullScreenLoader from "../components/FullScreenLoader"
import SuccessToastr from "../components/Toastr.jsx";
// import CardQuestion from "../components/CardQuestion"

const FolderDetails = () => {
    const searchParams = new URLSearchParams(document.location.search)
    const [showNewSubject, setShowNewSubject] = useState(false);
    // const [showCardModal, setShowCardModal] = useState(false);
    
    const [folderId, setFolderId] = useState('');
    const [loaderActive, setLoaderActive] = useState(false)
    const [folderObj, setFolderObj] = useState({});
    const [fullScreenLoader, setFullScreenLoader] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('')

    const [saveShow, setSaveShow] = useState('form');

    const handleClose = () => { setShowNewSubject(false);}
    const handleShowNewSubject = () =>  setShowNewSubject(true);
    // const handleShowCardModal = () => setShowCardModal(true);

    useEffect(() => {
        getFolderDetails()
      }, []);

    const getFolderDetails = () => {
        getFolderById(searchParams.get("fd")).then(response => {
          console.log(response);
          setFolderObj(response.data)
        })
    }  

    const saveNewSubject = () => {
      setFullScreenLoader(true)
      setShowNewSubject(false)
      var {fname, desc} = document.forms[0] 
      let newSubjectObj = {
        'name': fname.value,
        'description': desc.value,
        'folder': {
          'id': folderObj.id
        },
        'listCards' : []
      }
      saveSubject(newSubjectObj).then( response => {
          console.log(response)
          setFullScreenLoader(false)
          setSuccessMsg("Subject was created successfully")
          showSuccessDiv();

      }, error => {
          console.log(error)
          setFullScreenLoader(false)
      })
    }

    const showSuccessDiv = () => {
        getFolderDetails();
        setShowSuccess(true)
        setTimeout(() => {
            setShowSuccess(false)
        }, "4000");
    }

    return (
            <div>
                 <Navbar/>
                  <Container className="content">
                        <Title title={"Folder Details"} />

                        { fullScreenLoader && (<FullScreenLoader/>)}

                        <div className="fold-title">
                            <h1>{folderObj.name}</h1>
                         </div>
                         <div className="subject-btn-div">
                            <Button primary onClick={handleShowNewSubject}>New Subject</Button>
                         </div>

                            { showSuccess && (
                                <div className="success-div">
                                    <SuccessToastr title={"Success!!"} message={successMsg} />
                                </div>          
                            )}
                        
                         <div className="subjects-list">
                            {
                              folderObj['subjects']?.map((subject, index) =>  <ItemSubject key={index} subject={subject} subjectIndex={index} /> )
                            }                      
                         </div>                 
                  </Container>
                  

            <Modal show={showNewSubject} onHide={handleClose}>
                <Modal.Header closeButton>
                     <Modal.Title>Create New Subject</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {saveShow === 'form' && (
                        <form >
                            <div className="input-container">
                                <label><b>Subject Name</b></label>
                                <input type="text" name="fname" maxLength={30} required />
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
                    <Button color="green" onClick={saveNewSubject}>
                        Save Subject
                    </Button>
                </Modal.Footer>
            </Modal>

              {/* MODAL CARD QUESTION */}
            {/* <Modal show={showCardModal} onHide={handleClose} size={"lg"}>
                <Modal.Header closeButton>
                     <Modal.Title>Card Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CardQuestion subjectId={searchParams.get("fd")}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="red" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal> */}

            </div>
    )
} 

export default FolderDetails