import  { React, useState, useEffect, } from "react"; 
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Form, Button } from 'semantic-ui-react'
import {createQuestion} from "../services/components/CardQuestionService"


const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
  ]



const CardQuestion = ({subjectId}) => {
    const [state, setState] = useState({})
    const [editorData, setEditorData]= useState('');
    const [question, setQuestion] = useState('')
    const [showError, setShowError] = useState(false)

    const questionCard = () => {
        const questionCard = {
            question: question,
            answer: editorData,
            subject: {id: subjectId}
        }
    
        return questionCard;
     } 

    const handleSubmit = () => {
        
        let questionObj = questionCard();

        if(questionObj.question == '' || questionObj.answer == '' || questionObj.answer == 'Put your answer here!!'){
            setShowError(true)
            return false;
        }

       //console.log(questionObj)
       createNewQuestion(questionObj);
    }

    const createNewQuestion = (questionObj) => {

        createQuestion(questionObj).then(response => {          
            console.log(response);
          }).catch((error) => {
            console.log(error);
        }) ;;
    }

    const handleChange = (e) => {
       // console.log(e.target.value)
       setShowError(false)
       setQuestion(e.target.value)
    }
  
    return(
     
        <div style={{background: 'ghostwhite', padding: '10px'}}>
               <style>
                 {
                    `.div-ck {
                            margin: 10px 0 10px 0;
                            min-height: 300px
                        }
                    .ck-editor__editable {
                            min-height: 200px;
                        }`
                    }
                </style>
               <Form>
                    <Form.Group widths='equal'>
                    <Form.Input fluid label='Question' placeholder='Make your question here' maxLength="120" onChange={handleChange}/>
                    </Form.Group>
                
                        <div className="div-ck">
                        <label htmlFor=""> <b>Answer</b> </label>    
                        <CKEditor
                            editor={ ClassicEditor }
                            data=''
                          
                            onReady={ editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log( 'Editor is ready to use!', editor );
                            } }
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setShowError(false)
                                setEditorData(data);
                                ;//console.log( { event, editor, data } );
                            } }
                            // onBlur={ ( event, editor ) => {
                            //     console.log( 'Blur.', editor );
                            // } }
                            // onFocus={ ( event, editor ) => {
                            //     console.log( 'Focus.', editor );
                            // } }
                        />  
                            {
                                showError &&
                                    <div style={{width:'100%', display: 'flex', justifyContent: 'center'}} >
                                        <small style={{color:'red'}}> <b>No field can be empty!!</b></small>
                                    </div>
                            }
                           
                        </div>
                        
                    <Button primary onClick={handleSubmit}>Submit</Button>
                   
                </Form>
                
              
            </div>
    )
}

export default CardQuestion