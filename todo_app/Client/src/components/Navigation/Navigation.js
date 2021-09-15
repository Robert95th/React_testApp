import React, { useState, useEffect } from "react";
import { Menu, Segment,Header } from 'semantic-ui-react'
import {
    Link
  } from "react-router-dom";

const Navigation = ({ setActiveItem, activeItem ,Logout}) => {
    const handleItemClick = (e, name) => {
        setActiveItem(name.name);
    };

    return (
        <div >
            <Menu pointing secondary style={{ backgroundColor: "white",paddingTop:"10px" }}>
                <Header as='h2' image='http://localhost:4000/logo.png' content='Task Manager' style={{ backgroundColor: "white", margin: "5px",borderRight:"1px solid #bfbfbf",paddingRight:"10px" }} />
                <Menu.Item
                    name='home'
                    
                    active={activeItem === 'home'}
                    onClick={handleItemClick}
                    as={ Link }
                    to='/'
                />
                <Menu.Item
                    name='messages'
                    active={activeItem === 'messages'}
                    onClick={handleItemClick}
                    as={ Link }
                    to='/messages'
                />
                <Menu.Item
                    name='profile'
                    active={activeItem === 'profile'}
                    onClick={handleItemClick}
                    as={ Link }
                    to='/profile'
                />
                <Menu.Menu position='right'>
                    <Menu.Item
                        name='logout'
                        active={activeItem === 'logout'}
                        onClick={Logout}
                        as={ Link }
                        to='/logout'
                    />
                </Menu.Menu>
            </Menu>
        </div>
    );
}

export default Navigation;