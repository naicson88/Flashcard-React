import React from "react";
import { Message } from 'semantic-ui-react'

const SuccessToastr = ({title, message}) => {
 return (
   
          <Message positive>
            <Message.Header>{title}</Message.Header>
             <p>
                {message}
            </p>
          </Message>

  )
} 
export default SuccessToastr