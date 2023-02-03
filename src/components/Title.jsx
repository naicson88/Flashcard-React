
import React from "react";

import './../statics/css/components/TitleStyle.css'
const Title = ({title}) => {

    return (
        <div className="div-title">
            <h1>{title}</h1>
        </div>
    )
}

export default Title