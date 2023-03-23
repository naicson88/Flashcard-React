import  { React, useState, useEffect, } from "react"; 
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Form, Button } from 'semantic-ui-react'
import {createQuestion, deleteQuestion} from "../services/components/CardQuestionService"
import "../statics/css/components/CardQuestionStyle.css";


// const options = [
//     { key: 'm', text: 'Male', value: 'male' },
//     { key: 'f', text: 'Female', value: 'female' },
//     { key: 'o', text: 'Other', value: 'other' },
//   ]

const CardQuestion = ({subjectId, card, handleNewQuestion}) => {
    const [editorData, setEditorData]= useState('');
    const [question, setQuestion] = useState('')
    const [showError, setShowError] = useState(false)

     useEffect(() => {
        if(card !== null && card.id !== undefined){
                setQuestion(card.question);
                setEditorData(card.answer);
        }
      }, []);

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

        if(questionObj.question === '' || questionObj.answer === '' || questionObj.answer === 'Put your answer here!!'){
            setShowError(true)
            return false;
        }

       createNewQuestion(questionObj);
    }

    const createNewQuestion = (questionObj) => {
        createQuestion(questionObj).then(response => {          
            handleNewQuestion('success');
          }).catch((error) => {
            handleNewQuestion('error');
        }) ;;
    }

    const handleChangeQuestion = (e) => {
        setShowError(false)
        setQuestion(e.target.value)
    }

    const handleDelete = () => {
        if(window.confirm("Are you sure want to delete this question?") === true){
            deleteQuestion(card.id).then(response => {
                handleNewQuestion('success');
            }).catch((error) => {
                console.log(error);
                handleNewQuestion('error');
            })
        }     
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
                        <Form.Input fluid label='Question' placeholder='Make your question here' maxLength="120" onChange={handleChangeQuestion} value={question}/>
                    </Form.Group>
                
                        <div className="div-ck">
                        <label htmlFor=""> <b>Answer</b> </label>    
                        <CKEditor
                            editor={ ClassicEditor }
                            data={editorData}
                          
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
                    {
                        card !== null && card.id !== undefined && (
                            <Button secondary onClick={handleDelete} >Delete</Button>
                        )             
                    }
                   
                </Form>
                
              
            </div>
    )
}

export default CardQuestion