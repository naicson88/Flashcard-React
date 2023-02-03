import React from "react";
import Navbar from "../components/Navbar";
import Title from "../components/Title";
import './../statics/css/pages/HomePageStyle.css'
const HomePage = () => {

    return (
        <div>
            <Navbar />
        
            <div className="content">
             
                <Title title={"Folder Collections"} />
            </div>
        </div>
    )
}

export default HomePage