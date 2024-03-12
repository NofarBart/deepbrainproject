import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
// import React from 'react';


import React, { useEffect, useState } from "react";
import Axios from 'axios';
// import fs;
// const fs = require('fs');
// const path = require('path');
const zero = 0
const one = 1
let paradigm_name;
let animal_name;
const App = () => {

  // const [count, setCount] = useState(0)
  // will update list as database updates on refreshing the site
  const [paradigms, setParadigms] = useState([])
  const [animals, setAnimals] = useState([])
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [output, setOutput] = useState('');
  // const [progress, setProgress] = useState(0); // State to track progress
  const [percentage, setPercentage] = useState(null);

  

  paradigms.map(((paradigm, index) => {
    if (index === 0 && paradigm_name == null) {
      // console.log(paradigm_name)
        // Save the name of the paradigm in index 0
        // Assuming 'name' is the property name containing the paradigm's name
        // paradigm_name = paradigm.name;
        paradigm_name = null; 
    } 
        // if (paradigm_name != null && animal_name != null) {
        //   path = directoryPath + animal_name + "_" + paradigm_name;
        //   setSelectedFolder(path);

        // }
        // Return the original paradigm object for other elements
    return paradigm;
        
   
}));

animals.map(((animal, index) => {
  if (index === 0 && animal_name == null) {
      // Save the name of the paradigm in index 0
      // Assuming 'name' is the property name containing the paradigm's name
      animal_name = null;
  }
  return animal;
}));



  // Example usage
  const directoryPath = 'C:\\\\';
  let path = directoryPath + animal_name + "_" + paradigm_name;
  let response;

  const handleSelectChangePara = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedName = event.target[selectedIndex].text;
    // console.log(selectedName)
    if (selectedName === "select paradigm") {
      console.log("Entered if")
      paradigm_name = null
      setSelectedFolder(null)
    }
    else {
      paradigm_name = selectedName
      console.log(paradigm_name)
    }
    setIsVisible(false)
    setOutput(null)
    document.getElementById("python").innerHTML = "";
    if (animal_name != null && paradigm_name != null) {
      const path = directoryPath + animal_name + "_" + paradigm_name;
      setSelectedFolder(path);
  
    }
  };
  
  const handleSelectChangeAni = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedName = event.target[selectedIndex].text;

    if (selectedName === "select animal") {
      console.log("Entered if 2")
      animal_name = null
      setSelectedFolder(null)
      
    }
    else {
      animal_name = selectedName
      console.log(animal_name)
    }
    setIsVisible(false)
    setOutput(null)
    document.getElementById("python").innerHTML = "";
    // console.log(selectedName)
  
    if (animal_name != null && paradigm_name != null) {
      console.log("Entered if")
      const path = directoryPath + animal_name + "_" + paradigm_name;
      setSelectedFolder(path);
  
    }
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



  const fetchData = async () => {
      try {
          if(animal_name == null || paradigm_name == null) {
            setIsVisible(true);
            return;
          }
          setIsVisible(false);
          path = directoryPath + animal_name + "_" + paradigm_name;
          console.log(path) 
          // setSelectedFolder(null);
          const data_folder = { name: path }; // Object with key "name" and value "path"
          const options_folder = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data_folder)
        };
          Axios.post('http://localhost:5555/select-folder', options_folder)
            .catch(err => console.log(err))
          let config_path = 'C:\\Experiment16-Tester16-2024-02-21\\config.yaml'
          const data = { config: config_path, videos: path }; // Object with key "name" and value "path"
          const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          };
          document.getElementById("python").innerHTML = "analyzing video(s)";
          document.getElementById("spinner").style.display = "block"

          // // get the current value of the clock's display property
          // var displaySetting = mySpinner.style.display;
          // if (displaySetting == 'none') {
          //   // clock is visible. hide it
          //   mySpinner.style.display = 'block';
          // }

          Axios.post('http://localhost:5555/run-python-script', options)
          .then(response => {
            // Handle successful response
            if (response.data.error) {
              setOutput(prevOutput => prevOutput + response.data.error);
              document.getElementById('spinner').style.display = "none"
            }
          })
          .catch (error => {
            if (Axios.isCancel(error)) {
              console.log('Request canceled:', error.message);
            } else {
              // Handle other errors
              console.error('Error fetching data:', error);
            }
            document.getElementById('spinner').style.display = "none"
          });
    
          // setOutput(prevOutput => prevOutput + response.data);
          // Check if the process exited successfully
          // console.log("\n\n\n\nData isssssssssssssssss:\n\n\n\n\n ", response.data)
          // let res = JSON.parse(response.data);
          // console.log(res);
          // if (res) {
          //   setOutput(prevOutput => prevOutput + res);
          // }
          
          
          // console.log(response.data)
          // setPercentage(response.data.message);
      
      // if (displaySetting == 'block') {
      //   // clock is visible. hide it
      //   mySpinner.style.display = 'none';
      // }
      
  }
  catch {
  }
}
  const killPython = async () => {
    Axios.post('http://localhost:5555/stop-process')
      .then(response => {
        console.log(response.data.message);
        setIsVisible(false)
        setOutput(null)
        document.getElementById("python").innerHTML = "";
      })
      .catch(error => {
        console.error('Error stopping process:', error);
      });
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
              <option value="">select paradigm</option>
              {paradigms.map((paradigm, index) => {
                return <option key={index}>
                  {paradigm.name}
                </option>
                })} 
            </select>
          </div>
          <div className="text-wrapper-4">Subject:
          <select className="form-select" onChange={handleSelectChangeAni}>
            <option value="">select animal</option>
              {animals.map((animal, index) => {
                return <option key={index}>
                  {animal.name}
                </option>
                })} 
            </select>
          </div>
          <div className="alert alert-success text-wrapper-5" role="alert">
            <p>Please choose both paradigm and animal before pressing the "run" button. Results will appear in the corresponding directory.</p>
            <hr></hr>
          {selectedFolder && (
          <div>
            Selected Folder: {selectedFolder}
          </div>
          )}
          <p id="python"></p>
          <Spinner id='spinner' animation="border" role="status"></Spinner>
          
            <div>
              {/* <h2>Command Output:</h2> */}
              <pre>{output}</pre>
            </div>
        </div>
          
          <div className="text-wrapper-8">
            {isVisible && <div className="alert alert-danger" role="alert">Fill both paradigm and animal name!</div>}
            <Button variant="dark" size="lg" type='submit' onClick={() => fetchData()}>Run</Button>{' '}
            <Button variant="dark" size="lg" type='submit' onClick={() => killPython()}>Stop</Button>{' '}
            {/* <div> */}
            {/* <h1>Child Process Percentage</h1> */}
            {/* {percentage !== null ? (
                <p>Percentage: {percentage}</p>
            ) : (
                <p>Loading...</p>
            )} */}
            
        {/* </div> */}
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
