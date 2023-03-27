import React, { useState} from 'react'
import "../statics/css/components/ItemCardStyle.css";
import Modal from 'react-bootstrap/Modal';
import {Button} from 'semantic-ui-react'
import CardQuestion from "./CardQuestion"



const ItemCard = ({card, handleNewQuestion}) => {
    const [showCardModal, setShowCardModal] = useState(false);

    const handleShowCardModal = () => setShowCardModal(true);
    const handleClose = () => { setShowCardModal(false);}

    const setColorResponse = (resp) => {
        if(resp >= 80)
            return 'list-group-item-success';
        else if (resp >= 40 && resp < 80)
            return 'list-group-item-info';
        else if ( resp < 40 && resp > 0)
            return 'list-group-item-danger';
        else 
            return 'list-group-item-secondary'
    }

    const verifyCard = () => {
        if(card != null) {
            return (
                <ul className="list-group">
                 <li onClick={handleShowCardModal} className={`list-group-item list-group-item-action ${setColorResponse(card.percentageAssertiveness)} item-question`} >{card.question}</li>          
                </ul>
            )
        }
    }

    const handleCloseItemCard = () => {
        handleClose();  
        handleNewQuestion('success');
    }

    return(
        <div className="div-list">
            {verifyCard()}

            <Modal show={showCardModal} onHide={handleClose} size={"lg"}>
              <Modal.Header closeButton>
                  <Modal.Title>Card Question</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <CardQuestion card={card} handleNewQuestion={handleCloseItemCard}/>
              </Modal.Body>
              <Modal.Footer>
                  <Button color="red" onClick={handleClose} >
                      Close
                  </Button>
              </Modal.Footer>
          </Modal>     
        </div>  
              
    )
}

export default ItemCard