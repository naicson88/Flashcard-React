import React, { useEffect } from "react";
import "../statics/css/components/FolderCardStyle.css";
import { Icon } from 'semantic-ui-react'
import icon from '../statics/images/icons/folder.png'
import { useHistory } from 'react-router-dom';

const FolderCard = ({folder, removeFolder, editFolder, mouseEnter }) => {
    const history = useHistory();

    const handleRedirect = () => {
        history.push('/folder/details?fd='+folder.id)
    }
    return (
        <div className="folder-card" id={folder.id} onMouseEnter={mouseEnter}>
            <h5 onClick={handleRedirect}> {folder.name}</h5>
            <img src={icon} alt="Folder Icon" title={folder.description} width={150} height={140} />
            <div>
                <Icon name='edit outline' color='orange' size='big' title="Edit Folder" onClick={editFolder} /> &nbsp;
                <Icon name='delete'  color='red' size='big' className="redicon" title="Remove Folder" onClick={removeFolder} /> 
            </div>
            
        </div>
    )
}

export default FolderCard