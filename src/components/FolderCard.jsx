import React from "react";
import "../statics/css/components/FolderCardStyle.css";
import { Icon } from 'semantic-ui-react'
import icon from '../statics/images/icons/folder.png'
const FolderCard = () => {

    return (
        <div className="folder-card">
            <span>Folder Name Teste</span>
            <img src={icon} alt="Folder Icon" width={150} height={150} />
            <div>
            <Icon name='edit outline' color='orange' size='big' title="Edit Filder" /> &nbsp;
            <Icon name='delete'  color='red' size='big' className="redicon" title="Remove Folder"/> 
            </div>
            
        </div>
    )
}

export default FolderCard