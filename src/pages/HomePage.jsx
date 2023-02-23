import React from "react";
import Navbar from "../components/Navbar";
import Title from "../components/Title";
import './../statics/css/pages/HomePageStyle.css'
import SuccessToastr from "../components/Toastr";
const HomePage = () => {

    return (
        <div>
            <Navbar />
        
            <div className="content">
                <SuccessToastr />
                <Title title={"Folder Collections"} />
            </div>
        </div>
    )
}

export default HomePage