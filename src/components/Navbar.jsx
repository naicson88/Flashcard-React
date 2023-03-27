import { React, Component } from "react";
import { Input, Menu } from "semantic-ui-react";
import { useHistory } from 'react-router-dom';
import "../statics/css/components/NavbarStyle.css";

const  Navbar = ({activeItem}) => {
    const navigate = useHistory();

    const handleRedirect = (path) => {     
        navigate.push(path)
    }

    return (
      <div className="div-navbar">
        <Menu secondary >
          <Menu.Menu position="right">
            <Menu.Item
              name="home"
              active={activeItem === "home"}
              onClick={ () => {handleRedirect('/home')}}
            />
            <Menu.Item
              name="folder"
              active={activeItem === "folder"}
              onClick={ () => {handleRedirect('/folder')}}
            />
            <Menu.Item
              name="answer"
              active={activeItem === "answer"}
              onClick={ () => {handleRedirect('/answer')}}
            />
            <Menu.Item>
              <Input icon="search" placeholder="Search..." />
            </Menu.Item>
            <Menu.Item
              name="logout"
              active={activeItem === "logout"}
             // onClick={window.location.href = "http://www.w3schools.com"}
            />
          </Menu.Menu>
        </Menu>
      </div>
    );
  }


export default Navbar

