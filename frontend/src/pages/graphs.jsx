import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'; // Import Modal from react-bootstrap
import '../App.css';
import Axios from 'axios';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { VscTrash, VscSend } from "react-icons/vsc";
import { BsBoxArrowInLeft } from "react-icons/bs";

const Graphs = () => {
    const navigate = useNavigate();
    
    return (
        <div className="index">
            <div className="div-3">
                <div className="overlap">
                    <div className="a-mouse-from-th-wrapper">
                        <img
                            className="a-mouse-from-th"
                            alt="A mouse from th"
                            src={require('../images/a-mouse-from-th.png')}
                        />
                    </div>
                </div>
                <Tabs
          id="controlled-tab-example"
        //   activeKey={key}
        //   onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="home" title="Home">
            Tab content for Home
          </Tab>
          <Tab eventKey="profile" title="Profile">
            Tab content for Profile
          </Tab>
          <Tab eventKey="contact" title="Contact" disabled>
            Tab content for Contact
          </Tab>
    </Tabs>
            </div>
        </div>
    );
}

export default Graphs;
