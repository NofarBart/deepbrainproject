import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { VscAdd, VscChromeMinimize, VscPlay, VscPrimitiveSquare } from "react-icons/vsc";


import React, { useEffect, useState } from "react";
import Axios from 'axios';
// import fs;
// const fs = require('fs');
// const path = require('path');
const zero = 0
const one = 1
let paradigm_name;
let animal_name;

const Home = () => {
  // will update list as database updates on refreshing the site
  const [paradigms, setParadigms] = useState([])
  const [animals, setAnimals] = useState([])
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [output, setOutput] = useState('');
  const [selectedDirectory, setSelectedDirectory] = useState('C:\\\\');
  const [percentage, setPercentage] = useState(null);

  const navigate = useNavigate();

  const navigateToCreateParadigm = () => {
    // 👇️ navigate to /contacts
    navigate('/createParadigm', {replace: true});
  };

  const navigateToDeleteParadigm = () => {
    // 👇️ navigate to /contacts
    navigate('/deleteParadigm', {replace: true});
  };

  const navigateToCreateAnimal = () => {
    // 👇️ navigate to /contacts
    navigate('/createAnimal', {replace: true});
  };

  const navigateToDeleteAnimal = () => {
    // 👇️ navigate to /contacts
    navigate('/deleteAnimal', {replace: true});
  };

  const handleDirectoryChange = (event) => {
    event.preventDefault(); // Prevent default behavior
    const directoryPath = event.target.files[0].path;
    setSelectedDirectory(directoryPath);
  };

  paradigms.map(((paradigm, index) => {
    if (index === 0 && paradigm_name == null) {
        paradigm_name = null; 
    } 
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
  let resultSection = null; // Initialize result section to null

  if (!selectedFolder) {
    resultSection = <p>Result Section:</p>; // Display "Result Section" if folder is not chosen
  }

  const handleSelectChangePara = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedName = event.target[selectedIndex].text;
    // console.log(selectedName)
    if (selectedName === "select paradigm") {
      console.log("Entered if")
      paradigm_name = null
      setSelectedFolder(null)
      console.log("folder is: ",selectedFolder);
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
      console.log("folder is: ",selectedFolder);
  
    }
  };
  
  const handleSelectChangeAni = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedName = event.target[selectedIndex].text;

    if (selectedName === "select animal") {
      console.log("Entered if 2")
      animal_name = null
      setSelectedFolder(null)
      console.log("folder is: ",selectedFolder);
      
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
      console.log("folder is: ",selectedFolder);
  
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
          document.getElementById("python").innerHTML = "Analyzing video(s)";
          document.getElementById("spinner").style.display = "block"

          Axios.post('http://localhost:5555/run-python-script', options)
          .then(response => {
            // Handle successful response
            if (response.data.exitCode == zero) {
              setOutput('Analysis completed successfully')
            }
            else {
              setOutput('Analysis failed, restart the session... ')
            }
            document.getElementById('spinner').style.display = "none"
            document.getElementById("python").innerHTML = "";
          })
          .catch (error => {
            if (error.response && error.response.status === 404) {
              setOutput('Resource error: ' + error.response.data.message); // Handle 404 error from the backend
            } else if (!error.ok) {
              setOutput('Failed to fetch data: ' + error.message); // Handle other non-OK responses
            }
            document.getElementById('spinner').style.display = "none"
            document.getElementById("python").innerHTML = "";
          });
      
  }
  catch(error){
    if (error.status === 404) {
              setOutput('Resource not found'); // Handle 404 error from the backend
            } else if (!error.ok) {
              setOutput('Failed to fetch data'); // Handle other non-OK responses
            }
  }
}
  const killPython = async () => {
    Axios.post('http://localhost:5555/stop-process')
      .then(response => {
        console.log(response.data.message);
        setIsVisible(false)
        // setOutput('command output is: ')
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
              src={require('../images/a-mouse-from-th.png')}
            />
          </div>
          <div className="alert alert-success text-wrapper-6" role="alert">
            <p>Please choose both paradigm and animal before pressing the "run" button. Results will appear in the corresponding directory.</p>
          </div>
          <div className="text-wrapper-7">
            <label htmlFor="experimental-paradigm">Experimental Paradigm:</label>
            <select
              id="experimental-paradigm"
              className="form-select"
              style={{ right: '100px', left: '100px' }}
              onChange={handleSelectChangePara}
            >
              <option value="">select paradigm</option>
              {paradigms.map((paradigm, index) => (
                <option key={index}>{paradigm.name}</option>
              ))}
            </select>
            <Button className='btn btn-outline-success' variant='light' size="lg" onClick={navigateToCreateParadigm}><VscAdd /></Button>
            <Button className='btn btn-outline-danger' variant='light' size="lg" onClick={navigateToDeleteParadigm}><VscChromeMinimize /></Button>
          </div>
          <div className="text-wrapper-4">
            <label htmlFor="subject">Subject:</label>
            <select
              id="subject"
              className="form-select"
              style={{ right: '100px', left: '100px' }}
              onChange={handleSelectChangeAni}
            >
              <option value="">select animal</option>
              {animals.map((animal, index) => (
                <option key={index}>{animal.name}</option>
              ))}
            </select>
            
            <Button className='btn btn-outline-success' variant='light' size="lg" onClick={navigateToCreateAnimal}><VscAdd /></Button>
            <Button className='btn btn-outline-danger' variant='light' size="lg" onClick={navigateToDeleteAnimal}><VscChromeMinimize /></Button>
          </div>
          <div className="alert alert-success text-wrapper-5" role="alert">
            {selectedFolder && (
              <div>
                Selected Folder: {selectedFolder}
                <hr />
              </div>
            )}
            <pre className="result-text">{resultSection}</pre> {/* Display result section */}
            <p id="python"></p>
            <Spinner id='spinner' animation="border" role="status"></Spinner>
            <div>
              <pre>{output}</pre>
            </div>
          </div>
          <div className="text-wrapper-8">
            {isVisible && <div className="alert alert-danger" role="alert">Fill both paradigm and animal name!</div>}
            <Button variant="dark" size="lg" type='submit' onClick={() => fetchData()}><VscPlay size={28}/></Button>{' '}
            <Button variant="dark" size="lg" type='submit' onClick={() => killPython()}><VscPrimitiveSquare size={28}/></Button>{' '}
          </div>
        </div>
        <img
          className="deepbrain-logo"
          alt="Deepbrain logo"
          src={require('../images/deepbrain-logo.jpg')}
        />
      </div>
      {/* Directory Selection */}
      {/* <div className="directory-selection-wrapper">
        <div className="text-wrapper-9">
        <input
                id="directoryInput"
                type="text"
                value={selectedDirectory}
                onChange={(e) => setSelectedDirectory(e.target.value)}
                style={{ width: "300px" }} // Set the width to adjust the size
        ></input>
          {selectedDirectory && <p>Selected Directory: {selectedDirectory}</p>}
        </div>
      </div> */}
    </div>
    
  );
}

export default Home