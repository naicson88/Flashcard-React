import React, { useEffect } from "react";
import "../statics/css/components/FolderCardStyle.css";
import { Icon } from 'semantic-ui-react'
import icon from '../statics/images/icons/folder.png'
const FolderCard = ({folder, removeFolder, editFolder}) => {

    return (
        <div className="folder-card" id={folder.id}>
            <h5>{folder.name}</h5>
            <img src={icon} alt="Folder Icon" title={folder.description} width={150} height={140} />
            <div>
                <Icon name='edit outline' color='orange' size='big' title="Edit Folder" onClick={editFolder} /> &nbsp;
                <Icon name='delete'  color='red' size='big' className="redicon" title="Remove Folder" onClick={removeFolder} /> 
            </div>
            
        </div>
    )
}

export default FolderCard