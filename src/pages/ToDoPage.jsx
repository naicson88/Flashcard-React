import React from "react";
import Navbar from "../components/Navbar";
import Title from "../components/Title";
import './../statics/css/pages/HomePageStyle.css'
import './../statics/css/pages/ToDoStyle.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { Icon } from 'semantic-ui-react'

const ToDoPage = () => {

    const DaysOfWeek = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY','SUNDAY' ];
    const DaysColors = ['#DA70D6', '#F08080', '#228B22', '#4682B4', '#2F4F4F', '#556B2F', '#FF4500']

    const listTasks = ['TESTE', ' TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE sdasadasdasdasdasdasdasdas']

    const [taskOrder, setTaskOrder] = React.useState(listTasks)

    const handleOnDragEnd = (result) => {
        const items = Array.from(taskOrder);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setTaskOrder(items);
    }

    const handleRemoveTask = (day, index) => {
        alert('click')
        console.log(day + ' - ' + index);
    }

    // window.addEventListener('click', (event) => {
    //     // event has already been used for drag and drop
    //     if (event.defaultPrevented) {
    //       return;
    //     }
      
    //     handleRemoveTask();
    //   });

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
                                        <Icon disabled name='add square' size='large' title="Add New Task" />
                                    </th>
                                )}
                            </tr>                     
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                     <DragDropContext onDragEnd={handleOnDragEnd}>
                                        <Droppable droppableId="droppable-tasks">
                                           {(provided) => (
                                            <ul className="tasks" {...provided.droppableProps} ref={provided.innerRef}>
                                                { taskOrder.map((task, index) => {
                                                        return (
                                                            <Draggable  key={index} draggableId={index.toString()} index={index}  >
                                                            {(provided) => (
                                                                <li className="div-card-li" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                    {task}
                                                                    <div onClick={(event) => { event.preventDefault(); handleRemoveTask('MONDAY', index)}}>
                                                                        <Icon disabled name='trash' title="Add New Task" />                                       
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
                            </tr>
                        </tbody>
                    </table>
                </div>
                
            </div>
        </div>
    )
}

export default ToDoPage