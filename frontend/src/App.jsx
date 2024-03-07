import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
// import React from 'react';


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

  // if (paradigm_name != null && animal_name != null) {
  //   path = directoryPath + animal_name + "_" + paradigm_name;
  //   setSelectedFolder(path);

  // }

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
  // setSelectedFolder(path);

}

  const fetchData = async () => {
      try {
          let config_path = 'C:\\Experiment16-Tester16-2024-02-21\\config.yaml'
          const data = { config: config_path, videos: path }; // Object with key "name" and value "path"
          const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          };
          const response = await Axios.post('http://localhost:5555/run-python-script', options);
          setPercentage(response.data.message);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };


// const analyzeVideos = () => {
//   let config_path = 'C:\\Experiment16-Tester16-2024-02-21\\config.yaml'
//   // const [selectedFolder, setSelectedFolder] = useState(null);
//   // Create directory string
  
// //   path = directoryPath + animal_name + "_" + paradigm_name;
//   console.log(path) 
// //   // setSelectedFolder(null);
//   const data = { config: config_path, videos: path }; // Object with key "name" and value "path"
//   const options = {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data),
//     onUploadProgress: (progressEvent) => {
//       // Calculate progress percentage
//       const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
//       // Update progress state
//       setProgress(progress);
//     }
// };
//   Axios.post('http://localhost:5555/run-python-script', options)
//   .then(response => {
//     console.log('Response from server:', response);
//     // Reset progress when API call is complete
//     setProgress(0);
//   })
//   .catch(error => {
//     console.error('Error sending POST request:', error);
//     // Reset progress on error
//     setProgress(0);
//   });
    // .catch(err => console.log(err))
 // Run effect whenever these dependencies change
  // setSelectedFolder(path);

// }

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
          <div className="text-wrapper-5">
          <Button variant="dark" size="lg" type='submit' onClick={() => sendDirectoryPath(paradigm_name, animal_name, directoryPath)}>Choose location</Button>{' '}
          {selectedFolder && (
          <div>
            Selected Folder: {selectedFolder}
          </div>
          )}
          </div>
          {/* <div className="text-wrapper-5">Attempt:</div> */}
          
          <div className="text-wrapper-8">Parts:</div>
          
          <div className="frame-2">
            <Button variant="dark" size="lg" type='submit' onClick={() => fetchData()}>Run</Button>{' '}
            <div>
            <h1>Child Process Percentage</h1>
            {percentage !== null ? (
                <p>Percentage: {percentage}</p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
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
