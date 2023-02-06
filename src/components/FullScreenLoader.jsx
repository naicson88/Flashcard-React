import React from "react";
import { Loader,Dimmer, Image} from 'semantic-ui-react'
import "../statics/css/components/FullScreenLoaderStyle.css";

const FullScreenLoader = () => {  

    return (
        <div className="full-screen">
                <Loader active inline='centered' size='large' content='Loading...' inverted/>         
        </div>  
    )
}

export default FullScreenLoader