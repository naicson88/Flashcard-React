import React from "react";
import { Message } from 'semantic-ui-react'

const Toastr = ({toastrObj}) => {
 return (

    <>
        {
          toastrObj.status == 'positive' && 
            <div>
              <Message positive>
                  <Message.Header>{toastrObj.title}</Message.Header>
                  <p>
                      {toastrObj.msg}
                  </p>
              </Message>
            </div>
        }

        {
          toastrObj.status == 'negative' && 
            <div>
              <Message negative>
                  <Message.Header>{toastrObj.title}</Message.Header>
                  <p>
                      {toastrObj.msg}
                  </p>
              </Message>
            </div>
         }
    </>
      
       
    
          

  )
} 
export default Toastr