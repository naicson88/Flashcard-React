import { Button, Container, Header, Icon, Modal } from 'semantic-ui-react'

import  { React, useState, useEffect, useRef } from "react"; 

const FolderModal = (isOpen) => {
    const [open, setOpen] = useState(false)

  return (
    <Modal
        closeIcon
        open={isOpen}
    
        // onClose={() => setOpen(false)}
        // onOpen={() => setOpen(true)}
        >
        <Header icon='archive' content='Archive Old Messages' />
        <Modal.Content>
            <p>
            Your inbox is getting full, would you like us to enable automatic
            archiving of old messages?
            </p>
        </Modal.Content>
        <Modal.Actions>
            <Button color='red' onClick={() => setOpen(false)}>
            <Icon name='remove' /> No
            </Button>
            <Button color='green' onClick={() => setOpen(false)}>
            <Icon name='checkmark' /> Yes
            </Button>
        </Modal.Actions>
    </Modal>
  )
}

export default FolderModal