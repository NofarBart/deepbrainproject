import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'; // Import Modal from react-bootstrap
import '../App.css';
import '../Graphs.css';
import Axios from 'axios';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { VscTrash, VscSend } from "react-icons/vsc";
import { BsArrowBarDown } from "react-icons/bs";
import { BsBoxArrowInLeft } from "react-icons/bs";

const Graphs = () => {
    // const [key, setKey] = useState('home');
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState(1); // Default to the first tab

    const navigateToHome = () => {
        // 👇️ navigate to /contacts
        navigate('/');
        Axios.post('http://localhost:5555/directory/delete-photos')
    .catch(error => {
      if (error.response && error.response.status === 404) {

        return;
      } else if (!error.ok) {
      }
    });
      };

    const handleTabClick = (tabNumber) => {
        setSelectedTab(tabNumber);
    };
    
    return (
        <div className="index">
            <div className="div-3">
                {/* <div className="overlap">
                    <div className="a-mouse-from-th-wrapper" >
                        <img
                            className="a-mouse-from-th"
                            alt="A mouse from th"
                            src={require('../images/a-mouse-from-th.png')}
                        />
                    </div>
                </div> */}
                {/* <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
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
    </Tabs> */}

<div className="container">
            <div className="tab_trigger">
                <ul>
                    <li>
                        <label htmlFor="tab1" onClick={() => handleTabClick(1)}>Tab1</label>
                    </li>
                    <li>
                        <label htmlFor="tab2" onClick={() => handleTabClick(2)}>Tab2</label>
                    </li>
                    <li>
                        <label htmlFor="tab3" onClick={() => handleTabClick(3)}>Tab3</label>
                    </li>
                </ul>
            </div>
            <div className="tab_container_wrap">
                <input type="radio" id="tab1" name="tabs" defaultChecked={selectedTab === 1} />
                <div className={`tab_content_box ${selectedTab === 1 ? 'active' : ''}`}>
                    <h2>graph1</h2>
                    <img
                        className="graph1"
                        alt="plot1"
                        src={require('../output1.jpg')}
                    />
                     <div className="btn-group btn-group-toggle" data-toggle="buttons">
                    <Button className='btn btn-outline-dark' variant='light' size="lg"  data-toggle="tooltip" data-placement="top" title="return" onClick={navigateToHome}><BsBoxArrowInLeft /></Button> 
                    
                    <Button className='btn btn-outline-dark' variant='light' size="lg"  data-toggle="tooltip" data-placement="top" title="download"><a href='output1.jpg' download='velocity.jpg'><BsArrowBarDown />
                    
                    </a></Button></div>
                </div>
                <input type="radio" id="tab2" name="tabs" defaultChecked={selectedTab === 2} />
                <div className={`tab_content_box ${selectedTab === 2 ? 'active' : ''}`}>
                    <h2>graph2</h2>
                    <img
                        className="graph2"
                        alt="plot2"
                        src={require('../output2.jpg')}
                    />
                    <div className="btn-group btn-group-toggle" data-toggle="buttons">
                    <Button className='btn btn-outline-dark' variant='light' size="lg"  data-toggle="tooltip" data-placement="top" title="return" onClick={navigateToHome}><BsBoxArrowInLeft /></Button> 
                    
                    <Button className='btn btn-outline-dark' variant='light' size="lg"  data-toggle="tooltip" data-placement="top" title="download"><a href='output2.jpg' download='position.jpg'><BsArrowBarDown />
                    
                    </a></Button></div>
                </div>
                <input type="radio" id="tab3" name="tabs" defaultChecked={selectedTab === 3} />
                <div className={`tab_content_box ${selectedTab === 3 ? 'active' : ''}`}>
                    <h2>graph3</h2> 
                    <img
                        className="graph3"
                        alt="plot3"
                        src={require('../output3.jpg')}
                        
                    />  
                    <div className="btn-group btn-group-toggle" data-toggle="buttons">
                    <Button className='btn btn-outline-dark' variant='light' size="lg"  data-toggle="tooltip" data-placement="top" title="return" onClick={navigateToHome}><BsBoxArrowInLeft /></Button> 
                    
                    <Button className='btn btn-outline-dark' variant='light' size="lg"  data-toggle="tooltip" data-placement="top" title="download"><a href='output3.jpg' download='walking_pattern.jpg'><BsArrowBarDown />
                    
                    </a></Button></div>
                </div>
                
                
            </div>
            <img
                    className="deepbrain-logo"
                    alt="Deepbrain logo"
                    src={require('../images/deepbrain-logo.jpg')}
                />
           
        </div>
    {/* <div className="container">
        <div className="tab_triger">
            <ul>
                <li><label htmlFor="tab1">Tab1</label></li>
                <li><label htmlFor="tab2">Tab2</label></li>
                <li><label htmlFor="tab3">Tab3</label></li>
            </ul>
        </div>
        <div className="tab_container_wrap">
            <input type="radio" id="tab1" name="1"></input>
            <div className="tab_content_box">
                <h2>graph1</h2>
                <img 
                className="graph1"
                alt="plot1"
                src={require('../output1.jpg')}
                />
            </div>
            <input type="radio" id="tab2" name="2"></input>
            <div className="tab_content_box">
                <h2>graph2</h2>
                <img 
                className="graph2"
                alt="plot2"
                src={require('../output2.jpg')}
                />
            </div>
            <input type="radio" id="tab3" name="3"></input>
            <div className="tab_content_box">
                
                <h2>graph3</h2>
                <img 
                className="graph3"
                alt="plot3"
                src={require('../output3.jpg')}
                />
            </div>
        </div> */}
                {/* <Tabs
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="home" title="Home">
                <img
            className="graph1"
            alt="plot1"
            src={require('../output1.jpg')}
            />
          </Tab>
          <Tab eventKey="profile" title="Profile">
            Tab content for Profile
          </Tab>
          <Tab eventKey="contact" title="Contact" disabled>
            Tab content for Contact
          </Tab>
    </Tabs> */}
    {/* <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item" role="presentation">
            <a className="nav-link active" id="simple-tab-0" data-bs-toggle="tab" href="#simple-tabpanel-0" role="tab" aria-controls="simple-tabpanel-0" aria-selected="true">Tab 1</a>
        </li>
        <li className="nav-item" role="presentation">
            <a className="nav-link" id="simple-tab-1" data-bs-toggle="tab" href="#simple-tabpanel-1" role="tab" aria-controls="simple-tabpanel-1" aria-selected="false">Tab 2</a>
        </li>
        <li className="nav-item" role="presentation">
            <a className="nav-link" id="simple-tab-2" data-bs-toggle="tab" href="#simple-tabpanel-2" role="tab" aria-controls="simple-tabpanel-2" aria-selected="false">Tab 3</a>
        </li>
        </ul>
        <div className="tab-content pt-5" id="tab-content">
        <div className="tab-pane active" id="simple-tabpanel-0" role="tabpanel" aria-labelledby="simple-tab-0">Tab 1 selected</div>
        <div className="tab-pane" id="simple-tabpanel-1" role="tabpanel" aria-labelledby="simple-tab-1">Tab 2 selected</div>
        <div className="tab-pane" id="simple-tabpanel-2" role="tabpanel" aria-labelledby="simple-tab-2">Tab 3 selected</div>
        </div> */}
        {/* <div className="tabs">
            <input type="radio" className="tabs__radio" name="tabs-example" id="tab1" checked = "checked"></input>
            <label htmlFor="tab1" className="tabs__label">Tab #1</label>
            <div className="tabs__content">
                CONTENT for Tab #1
            </div><
            <input type="radio" className="tabs__radio" name="tabs-example" id="tab2">
            <label htmlFor="tab2" className="tabs__label">Tab #2</label>
            <div className="tabs__content">
                CONTENT for Tab #2
            </div> */}
        
    </div>    
    </div>
    );
}

export default Graphs;
