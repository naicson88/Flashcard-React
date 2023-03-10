import  { React, useState, useEffect, } from "react"; 
import "../statics/css/components/ItemCardStyle.css";
const ItemCard = ({card}) => {
    
    const setColorResponse = (resp) => {
        if(resp >= 80)
            return 'list-group-item-success';
        else if (resp >= 40 && resp < 80)
            return 'list-group-item-secondary';
        else if ( resp < 40)
            return 'list-group-item-danger';
    }

    return(
        <div className="div-list">
            <ul className="list-group">
            <li className={`list-group-item list-group-item-action ${setColorResponse(card.percentageAssertiveness)} item-question`}>{card.question}</li>          
            </ul>
        </div>
       
    )
}

export default ItemCard