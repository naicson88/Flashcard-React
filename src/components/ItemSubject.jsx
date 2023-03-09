import React, { Component ,useState} from 'react'

//import { Accordion, Icon } from 'semantic-ui-react'
import Accordion from 'react-bootstrap/Accordion';
import "../statics/css/components/ItemSubjectStyle.css";
import ItemCard from './ItemCard';

const  ItemSubject = ({subject, subjectIndex}) => {
  const [open, setOpen] = useState(false);

  return(
  
    <Accordion defaultActiveKey={['0']} alwaysOpen >
      <Accordion.Item eventKey={subjectIndex} >
        <Accordion.Header > <b>{subject.name}</b> </Accordion.Header>
        <Accordion.Body >
          <div className='subject-body'>
              {subject.description}

              <div>
                {
                    subject['listCards'].map((item , index) => <ItemCard key={index} card={item} ></ItemCard>)
                }
                  
              </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
    
}

export default ItemSubject