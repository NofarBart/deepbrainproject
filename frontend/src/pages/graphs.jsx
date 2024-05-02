import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
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
    const { state } = useLocation();
    const [selectedTab, setSelectedTab] = useState(1); // Default to the first tab
    const [formData, setFormData] = useState({
        name: "",
        errors: {},
      });
      useEffect(() => {
        console.log("Updated formData:", formData);
    }, [formData]); // This effect will be triggered whenever formData changes
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
        console.log(formData);
      };

      const validateForm = () => {
        const errors = {};
    
        // Check if username is empty
        if (!formData.name) {
          errors.name = "Title is required";
        }
    
        setFormData((prevState) => ({ ...prevState, errors }));
    
        // Return true if there are no errors
        return Object.keys(errors).length === 0;
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
          // Form is valid, submit data
          console.log(formData);
          const data = { name: formData.name }; // Object with key "name" and value "path"
          console.log("Data is: ", data);
        //   if(formData.name == " "){
        //     formData.name = "empty";
        //   }
        //   const options_folder = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // };
        try {
            let g_title;
            if(formData.name == " "){
                g_title = "empty";
            }
            else {
                g_title = formData.name;
            }
            let curr_graph = selectedTab;
            const data_folder = { name: state.h5, bpt: state.bodypart, graphs: selectedTab - 1, title: g_title }; // Object with key "name" and value "path"
            const options_folder = {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data_folder)
              };
            document.getElementById('spinner' + curr_graph).style.display = "block"
            // if (selectedTab === 1) {
            //     document.getElementById('spinner1').style.display = "block"
            // }
            // else if (selectedTab === 2){
            //     document.getElementById('spinner2').style.display = "block"
            // }
            // else {
            //     document.getElementById('spinner3').style.display = "block"
            // }
            Axios.post('http://localhost:5555/python/create-plots', options_folder)
              .then(response => {
                document.getElementById('spinner' + curr_graph).style.display = "none"
              });
        } catch (error) {
            console.log(error);
        }
      };}

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
                        <label htmlFor="tab1" onClick={() => handleTabClick(1)}>velocity</label>
                    </li>
                    <li>
                        <label htmlFor="tab2" onClick={() => handleTabClick(2)}>position</label>
                    </li>
                    <li>
                        <label htmlFor="tab3" onClick={() => handleTabClick(3)}>walking pattern</label>
                    </li>
                </ul>
            </div>
            <div className="tab_container_wrap">
                <input type="radio" id="tab1" name="tabs" defaultChecked={selectedTab === 1} />
                <div className={`tab_content_box ${selectedTab === 1 ? 'active' : ''}`}>
                    {/* <h2>graph1</h2> */}
                    <img
                        className="graph1"
                        alt="plot1"
                        src={require('../images/output1.jpg')}
                    />
                    <form id="myForm" onSubmit={handleSubmit} style={{ float: 'right' }}>
            
                    <label htmlFor="name">Title: &nbsp;</label>
                    <input type="text" name="name" id="name" 
                        value={formData.name} onChange = {handleChange} placeholder="Fill in your new title" style={{ height: 'calc(1.2em + .90rem + 10px)', marginTop: '20px' }}></input>
                        
                    {/* </div> */}
                    {formData.errors.name && (
                        <p style={{ color: "#D37676" }}>{formData.errors.name}</p> )}
                    &nbsp;
                    <Button className='btn btn-outline-dark' variant='light' size="lg" type='submit' value="submit" data-toggle="tooltip" data-placement="top" title="send"><VscSend size={20}/></Button>
                {/* </div> */}
                </form>
                     <div className="btn-group btn-group-toggle" data-toggle="buttons" style={{ marginTop: '20px' }}>
                    <Button className='btn btn-outline-dark' variant='light' size="lg"  data-toggle="tooltip" data-placement="top" title="return" onClick={navigateToHome}><BsBoxArrowInLeft /></Button> 
                    
                    <Button className='btn btn-outline-dark' variant='light' size="lg"  data-toggle="tooltip" data-placement="top" title="download"href='output1.jpg' download={'velocity-' + state.path + "-" + state.bodypart + ".jpg"}>
                    
                     <BsArrowBarDown  size={20}/> Download </Button></div>
                     <Spinner id='spinner1' animation="border" role="status" style={{ float: 'right', marginTop: '25px', marginRight: '10px' }}></Spinner>
                </div>
                <input type="radio" id="tab2" name="tabs" defaultChecked={selectedTab === 2} />
                <div className={`tab_content_box ${selectedTab === 2 ? 'active' : ''}`}>
                    {/* <h2>graph2</h2> */}
                    <img
                        className="graph2"
                        alt="plot2"
                        src={require('../images/output2.jpg')}
                    />
                    <form id="myForm" onSubmit={handleSubmit} style={{ float: 'right' }}>
            
                    <label htmlFor="name">Title: &nbsp;</label>
                    <input type="text" name="name" id="name" 
                        value={formData.name} onChange = {handleChange} placeholder="Fill in your new title" style={{ height: 'calc(1.2em + .90rem + 10px)', marginTop: '20px' }}></input>
                        
                    {/* </div> */}
                    {formData.errors.name && (
                        <p style={{ color: "#D37676" }}>{formData.errors.name}</p> )}
                    &nbsp;
                    <Button className='btn btn-outline-dark' variant='light' size="lg" type='submit' value="submit" data-toggle="tooltip" data-placement="top" title="send"><VscSend size={20}/></Button>
                {/* </div> */}
                </form>
                    <div className="btn-group btn-group-toggle" data-toggle="buttons" style={{ marginTop: '20px' }}>
                    <Button className='btn btn-outline-dark' variant='light' size="lg"  data-toggle="tooltip" data-placement="top" title="return" onClick={navigateToHome}><BsBoxArrowInLeft /></Button> 
                    
                    <Button className='btn btn-outline-dark' variant='light' size="lg"  data-toggle="tooltip" data-placement="top" title="download" href='output2.jpg' download={'position-' + state.path + "-" + state.bodypart + ".jpg"}><BsArrowBarDown  size={20}/> Download</Button></div>
                    <Spinner id='spinner2' animation="border" role="status" style={{ float: 'right', marginTop: '25px', marginRight: '10px' }}></Spinner>
                </div>
                <input type="radio" id="tab3" name="tabs" defaultChecked={selectedTab === 3} />
                <div className={`tab_content_box ${selectedTab === 3 ? 'active' : ''}`}>
                    {/* <h2>{state.bodypart}</h2>  */}
                    <img
                        className={"graph3"}
                        alt="plot3"
                        src={require('../images/output3.jpg')}
                        
                    />  
                    <form id="myForm" onSubmit={handleSubmit} style={{ float: 'right' }}>
            
                  <label htmlFor="name">Title: &nbsp;</label>
                  <input type="text" name="name" id="name" 
                      value={formData.name} onChange = {handleChange} placeholder="Fill in your new title" style={{ height: 'calc(1.2em + .90rem + 10px)', marginTop: '20px' }}></input>
                      
                  {/* </div> */}
                  {formData.errors.name && (
                      <p style={{ color: "#D37676" }}>{formData.errors.name}</p> )}
                  &nbsp;
                  <Button className='btn btn-outline-dark' variant='light' size="lg" type='submit' value="submit" data-toggle="tooltip" data-placement="top" title="send"><VscSend size={20}/></Button>
              {/* </div> */}
              </form>
              
                    <div className="btn-group btn-group-toggle" data-toggle="buttons" style={{ marginTop: '20px' }}>
                    <Button className='btn btn-outline-dark' variant='light' size="lg"  data-toggle="tooltip" data-placement="top" title="return" onClick={navigateToHome}><BsBoxArrowInLeft /></Button> 
                    
                    <Button className='btn btn-outline-dark' variant='light' size="lg"  data-toggle="tooltip" data-placement="top" title="download" href='output3.jpg' download={'walking_pattern-' + state.path + "-" + state.bodypart + ".jpg"} > <BsArrowBarDown size={20}/> Download</Button></div>
                <Spinner id='spinner3' animation="border" role="status" style={{ float: 'right', marginTop: '25px', marginRight: '10px' }}></Spinner>
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
