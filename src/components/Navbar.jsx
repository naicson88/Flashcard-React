import React, { Component } from "react";
import { Input, Menu } from "semantic-ui-react";
import "../statics/css/components/NavbarStyle.css";

export default class Navbar extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div className="div-navbar">
        <Menu secondary >
          <Menu.Menu position="right">
            <Menu.Item
              name="home"
              active={activeItem === "home"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="folder"
              active={activeItem === "folder"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="friends"
              active={activeItem === "friends"}
              onClick={this.handleItemClick}
            />
            <Menu.Item>
              <Input icon="search" placeholder="Search..." />
            </Menu.Item>
            <Menu.Item
              name="logout"
              active={activeItem === "logout"}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

