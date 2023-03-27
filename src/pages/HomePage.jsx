import React from "react";
import Navbar from "../components/Navbar";
import Title from "../components/Title";
import './../statics/css/pages/HomePageStyle.css'
import Toastr from "../components/Toastr";
const HomePage = () => {

    return (
        <div>
            <Navbar activeItem={'home'}/>
        
            <div className="content">
                
                <Title title={"Folder Collections"} />
            </div>
        </div>
    )
}

export default HomePage