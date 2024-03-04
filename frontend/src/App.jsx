import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
// import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import ParadigmList from './components/paradigmList';

import React, { useEffect, useState } from "react";
import Axios from 'axios';
// import fs;
// const fs = require('fs');
// const path = require('path');
let paradigm_name;
let animal_name;
const App = () => {

  // const [count, setCount] = useState(0)
  // will update list as database updates on refreshing the site
  const [paradigms, setParadigms] = useState([])
  const [animals, setAnimals] = useState([])
  const [selectedFolder, setSelectedFolder] = useState(null);

  

  paradigms.map(((paradigm, index) => {
    if (index === 0 && paradigm_name == null) {
      // console.log(paradigm_name)
        // Save the name of the paradigm in index 0
        // Assuming 'name' is the property name containing the paradigm's name
        paradigm_name = paradigm.name;
    } else {
        // Return the original paradigm object for other elements
        return paradigm;
    }
}));

animals.map(((animal, index) => {
  if (index === 0 && animal_name == null) {
      // Save the name of the paradigm in index 0
      // Assuming 'name' is the property name containing the paradigm's name
      animal_name = animal.name;
  } else {
      // Return the original paradigm object for other elements
      return animal;
  }
}));

  // Example usage
  const directoryPath = 'C:\\\\';
  let path = directoryPath + animal_name + "_" + paradigm_name;

  const handleSelectChangePara = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedName = event.target[selectedIndex].text;
    // console.log(selectedName)
    paradigm_name = selectedName
    console.log(paradigm_name)
  };
  
  const handleSelectChangeAni = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedName = event.target[selectedIndex].text;
    // console.log(selectedName)
    animal_name = selectedName
    console.log(animal_name)
  };

  // // will be run once 
  useEffect(()=> {  
      // here we get the data by requesting data from this link
      // to our nodejs server
      Axios.get('http://localhost:5555/paradigms')
      .then(paradigms => setParadigms(paradigms.data))
      .catch(err => console.log(err))
  }, []);

  useEffect(()=> {  
    // here we get the data by requesting data from this link
    // to our nodejs server
    Axios.get('http://localhost:5555/animals')
    .then(animals => setAnimals(animals.data))
    .catch(err => console.log(err))
}, []);


const sendDirectoryPath = (paradigm_name, animal_name, directoryPath) => {
  // const [selectedFolder, setSelectedFolder] = useState(null);
  // Create directory string
  
  path = directoryPath + animal_name + "_" + paradigm_name;
  console.log(path) 
  // setSelectedFolder(null);
  const data = { name: path }; // Object with key "name" and value "path"
  const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
};
  Axios.post('http://localhost:5555/select-folder', options)
    .catch(err => console.log(err))
 // Run effect whenever these dependencies change
  setSelectedFolder(path);

}

const analyzeVideos = () => {
  let config_path = 'C:\\Experiment16-Tester16-2024-02-21\\config.yaml'
  // const [selectedFolder, setSelectedFolder] = useState(null);
  // Create directory string
  
//   path = directoryPath + animal_name + "_" + paradigm_name;
  console.log(path) 
//   // setSelectedFolder(null);
  const data = { name: config_path }; // Object with key "name" and value "path"
  const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
};
  Axios.post('http://localhost:5555/run-python-script', options)
    .catch(err => console.log(err))
 // Run effect whenever these dependencies change
  // setSelectedFolder(path);

}

  return (
    
    <div className="index">
      <div className="div-3">
        <div className="overlap">
          <div className="a-mouse-from-th-wrapper">
            <img
              className="a-mouse-from-th"
              alt="A mouse from th"
              src={require('./images/a-mouse-from-th.png')}
            />
          </div>
          
          <div className="text-wrapper-7">Experimental Paradigm:
            <select className="form-select" onChange={handleSelectChangePara}>
              {paradigms.map((paradigm, index) => {
                return <option key={index}>
                  {paradigm.name}
                </option>
                })} 
            </select>
          </div>
          <div className="text-wrapper-4">Subject:
          <select className="form-select" onChange={handleSelectChangeAni}>
              {animals.map((animal, index) => {
                return <option key={index}>
                  {animal.name}
                </option>
                })} 
            </select>
          </div>
          <div className="frame-4">
          <Button variant="dark" size="lg" type='submit' onClick={() => sendDirectoryPath(paradigm_name, animal_name, directoryPath)}>Choose location</Button>{' '}
          {selectedFolder && (
          <div>
            Selected Folder: {selectedFolder}
          </div>
          )}
          </div>
          <div className="text-wrapper-5">Attempt:</div>
          
          <div className="text-wrapper-8">Parts:</div>
          
          <div className="frame-2">
            <Button className="text-wrapper-9" type='submit' onClick={() => analyzeVideos()}>Run</Button>{' '}
          </div>
          <div className="frame-3">
            <div className="text-wrapper-9">Restart</div>
          {/* </div>
          {/* <div className="frame-4">
            {/* <div className="text-wrapper-9">Choose location</div> */}
          </div>
        </div>
        
        <img
          className="deepbrain-logo"
          alt="Deepbrain logo"
          src={require('./images/deepbrain-logo.jpg')}
        />
        {/* <li>
            <Link to="/create">Contact</Link>
        </li> */}
        
      </div>
      
        {/* <input directory="" webkitdirectory="" type="file" /> */}
    </div>
    
  );
};


export default App
