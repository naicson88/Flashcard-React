import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Title from "../components/Title";
import './../statics/css/pages/HomePageStyle.css'
import './../statics/css/pages/ToDoStyle.css'
import Modal from 'react-bootstrap/Modal';
import {Button, Container, Loader, Popup } from 'semantic-ui-react'
import {getToDo, removeTask, updateToDo} from "../services/pages/ToDoService"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { Icon } from 'semantic-ui-react'

const ToDoPage = () => {

    const [show, setShow] = useState(false);
    const [handleClose, setHandleClose] = useState(false);

    const DaysOfWeek = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY','SUNDAY' ]; // NÃO MUDAR ORDEM
    const DaysColors = ['#DA70D6', '#F08080', '#228B22', '#4682B4', '#2F4F4F', '#556B2F', '#FF4500']

    const [todoObj, setTodoObj] = React.useState({})

    const [listTasks, setListTask] = React.useState([])

    const [taskOrder, setTaskOrder] = React.useState(listTasks)
    
    React.useEffect(() => {
        handleGetToDo();
      }, []);

    const handleOnDragEnd = (result) => {
        const items = Array.from(taskOrder);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setTaskOrder(items);
    }

    const handleRemoveTask = (day, index) => {
        removeTask(day, index).then(todo => {
            setListTask(todo['dailyTasks'])
            setTaskOrder(todo.data.dailyTasks)
        })
    }

    const handleGetToDo = () => {
         getToDo().then( todo =>{
            setTodoObj(todo);
            setListTask(todo['dailyTasks'])
            setTaskOrder(todo.data.dailyTasks)
            console.log(taskOrder);
        })
    }

    const handleAddTask = (day) => {
        setShow(true)
        // let obj = {
        //     'classColor':"color-5",'name': "First Task Added dinamicaly"
        // }
        // updateToDo(day, obj).then(todo => {
        //     setListTask(todo['dailyTasks'])
        //     setTaskOrder(todo.data.dailyTasks)
        // })
    }

    return (
        <div>
            <Navbar activeItem={'todo'}/>
        
            <div className="content">               
                <Title title={"To Do Page"} />

                <div className="week-div">
                    <table>
                        <thead>
                            <tr>
                            {DaysOfWeek.map((day, index) => 
                                    <th 
                                        className="th-days" style={{color: DaysColors[index].toString()}} >{day} 
                                        <span onClick={() => {handleAddTask(day)}}>
                                            <Icon disabled name='add square' size='large' title="Add New Task" />
                                        </span>
                                       
                                    </th>
                                )}
                            </tr>                     
                        </thead>
                        <tbody>
                            <tr>
                                {taskOrder.map((taskObj, i) => {
                                  return (
                                    <td>
                                     <DragDropContext onDragEnd={handleOnDragEnd}>
                                        <Droppable droppableId="droppable-tasks">
                                            {(provided) => (
                                            <ul className="tasks" {...provided.droppableProps} ref={provided.innerRef}>
                                                { taskObj['tasks'].map((task, index) => {
                                                    return (
                                                        <Draggable  key={index} draggableId={index.toString()} index={index} >
                                                        {(provided) => (
                                                            <li className={'div-card-li ' + task.classColor} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                {task.name}

                                                                <div className="task-icons">
                                                                  <div>
                                                                     <Icon disabled name=' clock  ' title="Remove Task" className="clock"/>
                                                                     <span style={{color: 'gray', fontSize: 'smaller'}}>19:30</span> 
                                                                    </div>                                                                 
                                                                   <div  onClick={(event) => { handleRemoveTask(taskObj.day, index)}} >
                                                                     <Icon disabled name='trash' title="Remove Task" className="trash" />
                                                                   </div>                                                                                                                                                                                                                                       
                                                                </div> 
                                                     
                                                            </li>                                        
                                                        )}
                                                        </Draggable>
                                                    )
                                                })}
                                                {provided.placeholder}
                                            </ul>
                                            )}
                                        </Droppable>                                          
                                    </DragDropContext> 
                                 </td>
                                  )
                                })}
                                
                            </tr>
                        </tbody>
                    </table>
                </div>
                
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Folder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <form >
                            <div className="input-container">
                                <label>Task</label>
                                <input type="text" name="task" maxLength={50} required class="form-control"/>
                            </div> 
                            <div className="input-container">
                                <label>Card Color</label>
                               <select name="color" id="" class="form-control">
                                 <option value="a"> color 1</option>
                                 <option value="b"> color 2</option>
                               </select>
                            </div>
                            <div className="input-container">
                            <label class="form-check-label" for="defaultCheck1">
                               Has Time
                            </label>
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                            
                            <label for="appt">Choose a time:</label>

                            <input type="time" id="appt" name="appt" min="00:00" max="24:00" style={{width: '20%'}}></input>
                            </div>
                        </form>                   
                </Modal.Body>
                <Modal.Footer>
                    <Button color="red" onClick={() => {setShow(false)}}>
                        Close
                    </Button>
                    <Button color="green">
                        Save Task
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

        

    )
}

export default ToDoPage