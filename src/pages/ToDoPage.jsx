import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Title from "../components/Title";
import './../statics/css/pages/HomePageStyle.css'
import './../statics/css/pages/ToDoStyle.css'
import Modal from 'react-bootstrap/Modal';
import {Button} from 'semantic-ui-react'
import {getToDo, removeTask, updateToDo, updateDailyTasks} from "../services/pages/ToDoService"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { Icon } from 'semantic-ui-react'

const ToDoPage = () => {

    const [show, setShow] = useState(false);
    const [handleClose, setHandleClose] = useState(false);
    const [dayOrigin, setDayOrigin] = useState('')

    const DaysOfWeek = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY','SUNDAY' ]; // NÃO MUDAR ORDEM
    const DaysColors = ['#DA70D6', '#F08080', '#228B22', '#4682B4', '#2F4F4F', '#556B2F', '#FF4500']

    const [todoObj, setTodoObj] = React.useState({})

    const [listTasks, setListTask] = React.useState([])

    const [taskOrder, setTaskOrder] = React.useState(listTasks)
    
    React.useEffect(() => {
        handleGetToDo();
      }, []);

    const handleOnDragEnd = (result) => {
        const {destination, source, draggableId} = result;

        if(!destination){return;}

        if(destination.droppableId === source.droppableId && destination.index === source.index){return;}

        const start = taskOrder.find(t => t.id === source.droppableId);
        const finish = taskOrder.find(t => t.id === destination.droppableId);

        //SAME COLUMN
        if(start.id === finish.id) {    
            const tasks = Array.from(taskOrder.find(t => t.id === start.id)['tasks'])
            const [reorderedItem] = tasks.splice(source.index, 1);
            tasks.splice(destination.index, 0, reorderedItem);
            taskOrder.find(t => t.id === start.id)['tasks'] = tasks;
            setTaskOrder(taskOrder);
        } 
           // TO ANOTHER COLUMN
        else {           
            const tasks = Array.from(taskOrder.find(t => t.id === start.id)['tasks'])
            const [reorderedItem] = tasks.splice(source.index, 1);
            taskOrder.find(t => t.id === finish.id)['tasks'].splice(destination.index, 0, reorderedItem);
            //taskOrder.find(t => t.id === finish.id)['tasks'] = tasks;
            taskOrder.find(t => t.id === start.id)['tasks'].splice(source.index, 1)
            setTaskOrder(taskOrder);
        }
        
        handleUpdateDailyTasks();
        
    }

    const handleUpdateDailyTasks = () => {
        updateDailyTasks(taskOrder).then(todo => {
            setTodoObj(todo);
            setListTask(todo['dailyTasks'])
            setTaskOrder(todo.data.dailyTasks);
        }, err => {
            window.location.reload(false);
        })
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
            console.log(JSON.stringify(todo.data, null, 2));
        })
    }

    const handleAddTask = (day) => {
        setDayOrigin(day);
        setShow(true)
    }

    const handleSaveTask = () => {
        var {task, color, appt} = document.forms[0]

        if(task.value === '' || task.value.length == 0){
            alert('Task cannot be empty')
            return false;
        }

        let newTask = {
            name : task.value,
            classColor : color.value,
            time : appt.value
        }
        
        setShow(false);

        updateToDo(dayOrigin, newTask).then(todo => {
            setListTask(todo['dailyTasks'])
            setTaskOrder(todo.data.dailyTasks)
        })
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
                        <DragDropContext onDragEnd={handleOnDragEnd}>
                            <tr>
                            
                                {taskOrder.map((taskObj, i) => {
                                  return (
                                                                     
                                    <td>
                                        
                                        <Droppable droppableId={taskObj.id}>
                                            {(provided, snapshot) => (
                                            <ul className="tasks" 
                                               {...provided.droppableProps} 
                                               ref={provided.innerRef}
                                                 >
                                                { taskObj['tasks'].map((task, index) => {
                                                    return (
                                                        <Draggable  key={task.id} draggableId={task.id} index={index} >
                                                        {(provided, snapshot) => (
                                                            <li className={'div-card-li ' + task.classColor}
                                                                isDraggingOver={snapshot.isDraggingOver} 
                                                                ref={provided.innerRef} 
                                                                {...provided.draggableProps} 
                                                                {...provided.dragHandleProps}
                                                                isDragging={snapshot.isDragging}
                                                                    >
                                                                {task.name}

                                                                <div className="task-icons">
                                                                  
                                                                    <div>{task.time && (
                                                                        <div>
                                                                        <Icon disabled name=' clock  ' title="Remove Task" className="clock"/>
                                                                        <span style={{color: 'gray', fontSize: 'smaller'}}>{task.time}</span> 
                                                                        </div>
                                                                        )}
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
                                        </td>                                     
                                   
                               
                                  )
                                })}
                               
                            </tr>
                            </DragDropContext> 
                        </tbody>
                    </table>
                </div>

                <section className="current-tasks">

                    <div className="cur-todo-column">
                        <div className="cur-todo-header">
                            <h3>Todo</h3>
                        </div>

                        <div className="cur-todo-body">

                          <div className="textarea-div">
                             <textarea name="" id=""  rows="4" ></textarea>
                          </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item list-group-item-action list-group-item-light">Cras justo odio</li>
                                <li class="list-group-item list-group-item-action list-group-item-light">Dapibus ac facilisis in</li>
                                <li class="list-group-item list-group-item-action list-group-item-light">Vestibulum at eros</li>
                            </ul>

                        </div>
                    </div>

                    <div className="cur-todo-column">

                        <div className="cur-todo-header">
                            <h3>Doing</h3>
                        </div>

                        <div className="cur-todo-body">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item list-group-item-action list-group-item-warning">Cras justo odio</li>
                            <li class="list-group-item list-group-item-action list-group-item-warning">Dapibus ac facilisis in</li>
                            <li class="list-group-item list-group-item-action list-group-item-warning">Vestibulum at eros</li>
                        </ul>
                        </div>
                    </div>
                    
                    <div className="cur-todo-column">
                        <div className="cur-todo-header">
                         <h3>Done</h3>
                        </div>
                        
                        <div className="cur-todo-body">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item list-group-item-action list-group-item-success">Cras justo odio</li>
                                <li class="list-group-item list-group-item-action list-group-item-success">Dapibus ac facilisis in</li>
                                <li class="list-group-item list-group-item-action list-group-item-success">Vestibulum at eros</li>
                            </ul>
                        </div>
                    </div>
                </section>
                
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
                                 <option value="color-1" style={{background: ' rgba(44, 126, 107, 0.16)'}}> Color 1</option>
                                 <option value="color-2" style={{background: ' rgba(242, 130, 123, 0.2)'}}> Color 2</option>
                                 <option value="color-3" style={{background: ' rgba(123, 128, 242, 0.2)'}}> Color 3</option>
                                 <option value="color-4" style={{background: ' rgba(123, 242, 138, 0.2)'}}> Color 4</option>
                                 <option value="color-5" style={{background: ' rgba(246, 241, 70, 0.2)'}}> Color 5</option>
                        
                               </select>
                            </div>
                            <div className="input-container">
                                <label for="appt">Time (Optional):</label>
        
                                <input 
                                    type="time" 
                                    id="appt" 
                                    name="appt" 
                                    min="00:00" 
                                    max="24:00" 
                                    placeholder="15:45" 
                                    style={{width: '20%'}} />
                             </div>
                        </form>                   
                </Modal.Body>
                <Modal.Footer>
                    <Button color="red" onClick={() => {setShow(false)}}>
                        Close
                    </Button>
                    <Button color="green" onClick={handleSaveTask}>
                        Save Task
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

        

    )
}

export default ToDoPage