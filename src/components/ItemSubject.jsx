import React, {useState, useEffect} from 'react'

//import { Accordion, Icon } from 'semantic-ui-react'
import Accordion from 'react-bootstrap/Accordion';
import "../statics/css/components/ItemSubjectStyle.css";
import ItemCard from './ItemCard';
import {Button, Icon} from 'semantic-ui-react'
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip';
import CardQuestion from "./CardQuestion"
import {deleteSubject, getById} from "../services/components/ItemSubjectService"
import FullScreenLoader from "../components/FullScreenLoader"

const  ItemSubject = ({subject, subjectIndex}) => {
  const [showCardModal, setShowCardModal] = useState(false);
  const [fullScreenLoader, setFullScreenLoader] = useState(false);
  const [cardQuestions, setCardQuestions] = useState([])

  const handleShowCardModal = () => setShowCardModal(true);

  const handleClose = () => { setShowCardModal(false);}

  useEffect(()=>{
    setCardQuestions(subject.listCards)
	}, [])

  const removeSubject = () => {
      if(window.confirm("Are SURE you want delete entire Subject?") === true) {
        deleteSubject(subject.id).then(response => {
            console.log(response)
        })
      }
  }

  const  handleNewQuestion = (status) => {
     setFullScreenLoader(true);
     if(status === 'success'){
      handleClose();  
      getSubjectById();
      setFullScreenLoader(false);

     } else {
        handleClose();  
        setFullScreenLoader(false);
     }
  }

  const getSubjectById = () => {
      getById(subject.id).then(response => {
        subject.listCards = [];
        subject.listCards = response.data.listCards
        setCardQuestions(subject.listCards)
        iterateListQuestions();
      })
    }

   const iterateListQuestions = () => {
     
        return (
            <div>
            {
                cardQuestions.map((item , index) => <ItemCard key={index} card={item} handleNewQuestion={handleNewQuestion}></ItemCard>)
            }                   
          </div>
        )
   } 
  return(
  <>  
      { fullScreenLoader && (<FullScreenLoader/>)}
      <Accordion defaultActiveKey={['0']} alwaysOpen >
        <Accordion.Item eventKey={subjectIndex} >
          <Accordion.Header > <b>{subject.name}</b> </Accordion.Header>
          <Accordion.Body >
            <div className='div-color-label'>
              <OverlayTrigger
                  delay={{ hide: 450, show: 300 }}
                  overlay={(props) => (
                    <Tooltip {...props}>
                        80% correct answers or above
                    </Tooltip>
                  )}
                  placement="top"
                  >     
                  <div className='list-group-item-success div-color'><span>Thisss</span> </div>     
                </OverlayTrigger>  
                <OverlayTrigger
                  delay={{ hide: 450, show: 300 }}
                  overlay={(props) => (
                    <Tooltip {...props}>
                       less than 80% and more than 60% correct answers
                    </Tooltip>
                  )}
                  placement="top"
                  >     
                  <div className='list-group-item-info div-color'><span>Thisss</span> </div>    
                </OverlayTrigger>   
                <OverlayTrigger
                  delay={{ hide: 450, show: 300 }}
                  overlay={(props) => (
                    <Tooltip {...props}>
                      less than 60% correct answers
                    </Tooltip>
                  )}
                  placement="top"
                  >     
                    <div className='list-group-item-danger div-color'><span>Thisss</span> </div>  
                </OverlayTrigger>  
                <OverlayTrigger
                  delay={{ hide: 450, show: 300 }}
                  overlay={(props) => (
                    <Tooltip {...props}>
                        No Attempts
                    </Tooltip>
                  )}
                  placement="top"
                  >     
                    
                  <div className='list-group-item-secondary div-color'><span>Thisss</span> </div>
                </OverlayTrigger>               
                
            </div>
            

            <div className='subject-body'>
              <div className='div-description'>      
                <Button inverted color='orange' onClick={handleShowCardModal}>New Question</Button> 
                <div onClick={removeSubject} className="div-icon-trash">
                  <Icon disabled name='trash alternate' size='big' color='red' title="Delete Subject" />   
                </div>
                 
              </div>            
              { iterateListQuestions() }
                {/* <div>
                  {
                      subject['listCards'].map((item , index) => <ItemCard key={index} card={item} ></ItemCard>)
                  }                   
                </div> */}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Modal show={showCardModal} onHide={handleClose} size={"lg"}>
          <Modal.Header closeButton>
              <Modal.Title>Card Question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <CardQuestion subjectId={subject.id} card={null} handleNewQuestion={handleNewQuestion}/>
          </Modal.Body>
          <Modal.Footer>
              <Button color="red" onClick={handleClose}>
                  Close
              </Button>
          </Modal.Footer>
      </Modal>

      
    </>
  )
    
}

export default ItemSubject