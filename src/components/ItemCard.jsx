import  { React } from "react"; 
import "../statics/css/components/ItemCardStyle.css";
const ItemCard = ({card}) => {
    
    const setColorResponse = (resp) => {
        if(resp >= 80)
            return 'list-group-item-success';
        else if (resp >= 40 && resp < 80)
            return 'list-group-item-info';
        else if ( resp < 40 && resp > 0)
            return 'list-group-item-danger';
        else 
            return 'list-group-item-secondary'
    }

    const verifyCard = () => {
        if(card != null) {
            return (
                <ul className="list-group">
                 <li className={`list-group-item list-group-item-action ${setColorResponse(card.percentageAssertiveness)} item-question`}>{card.question}</li>          
                </ul>
            )
        }
    }

    return(
        <div className="div-list">
            {verifyCard()}
        </div>       
    )
}

export default ItemCard