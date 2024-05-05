import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { VscAdd, VscChromeMinimize, VscPlay, VscPrimitiveSquare, VscSend, VscGraph, VscGraphLine } from "react-icons/vsc";
import { BsPencil, BsBoxArrowInLeft} from "react-icons/bs";
import React, { useEffect, useState } from "react";
import Axios from 'axios';
// import Tab from 'react-bootstrap/Tab';
// import Tabs from 'react-bootstrap/Tabs';



// import fs;
// const fs = require('fs');
// const path = require('path');
const zero = 0
const one = 1
let paradigm_name;
let animal_name;
let session_number;
let flag_kill = zero;

const Home = () => {
  const [paradigms, setParadigms] = useState([])
  const [animals, setAnimals] = useState([])
  const [sessions, setSessions] = useState([])
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [output, setOutput] = useState('');
  const [selectedDirectory, setSelectedDirectory] = useState(localStorage.getItem('selectedDirectory') || 'C:\\info\\');
  const [pathInput, setPathInput] = useState(""); // State to hold the input value in the modal
  const [show, setShow] = useState(false);
    // State to manage modal visibility and selected radio button
  const [list, setList] = useState([]);
  const [listBodyParts, setListBodyParts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showBodyPartsModal, setShowBodyPartsModal] = useState(false);
  const [selectedBodyPartOption, setSelectedBodyPartOption] = useState('');
  
  let config_path = 'C:\\Experiment18-Tester18-2024-02-29\\config.yaml'

    // Function to toggle modal visibility
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    // Function to toggle modal visibility
    const toggleBodyPartModal = () => {
      setShowBodyPartsModal(!showBodyPartsModal);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSaveChanges = () => {
    if(pathInput !== "") {
      setSelectedDirectory(pathInput); // Update selectedDirectory with the input value
    }
    handleClose(); // Close the modal after saving changes
  };

  const handleSaveContinue = () => {
  path = selectedDirectory + animal_name + "\\" + paradigm_name + "\\" + session_number + "\\" + selectedOption;
  console.log(path) 
  const withoutLabeled = path.replace(/_labeled\.mp4$/, '.mp4');
  const parts = withoutLabeled.split('.');
  const withoutExtension = parts.slice(0, -1).join('.'); // Removes the last part (file extension)
  const withH5Extension = withoutExtension + '.h5';
  console.log(withH5Extension); // Output: '/path/to/video.h5'
  console.log(selectedBodyPartOption);
  // setSelectedFolder(null);
  const data_folder = { name:withH5Extension, bpt:selectedBodyPartOption, graphs:3, title:"something" }; // Object with key "name" and value "path"
  const options_folder = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data_folder)
    };
    document.getElementById("python").innerHTML = "Creating plots...";
    document.getElementById("spinner").style.display = "block"
  Axios.post('http://localhost:5555/python/create-plots', options_folder)
    .then(response => {
      navigateToGraphs(withH5Extension);
    });
  }

const handleBodyPartSave = () => {
  if(selectedOption === "") {
    setIsVisibleModal(true);
    return;
  }
  setIsVisibleModal(false);
  toggleBodyPartModal();
 
  handleSaveContinue();
  setOutput(null);


} 

const handleSave = () => {
  if(selectedOption === "") {
    setIsVisibleModal(true);
    return;
  }
  
  setIsVisibleModal(false);
  toggleModal(); // Close the modal after saving changes
  toggleBodyPartModal();
};

const changeInfoToAnalysis = () => {
  let newDirectoryPath = selectedDirectory;
  if (newDirectoryPath.includes("info\\")) {
    // Replace "info\" with "analysis\"
    newDirectoryPath = newDirectoryPath.replace("info\\", "analysis\\");
    console.log("Updated directory path:", newDirectoryPath);
  } else {
    console.log("Directory path does not contain 'info\\'");
  }
  return newDirectoryPath;
} 

  const navigate = useNavigate();

  const navigateToGraphs = (withH5Extension) => {
    // 👇️ navigate to /contacts
    // Check if the directory path contains "info\" substring
    let newPath = changeInfoToAnalysis();
    let savingPath = newPath + animal_name + "\\" + paradigm_name + "\\" + session_number;
    navigate('/graphs', {replace: true, state: {bodypart: selectedBodyPartOption, path: animal_name + "_" + paradigm_name + "_" + session_number + "_" + selectedOption, h5: withH5Extension, save: savingPath}});
  };

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

const getFiles = async () => {
  path = selectedDirectory + animal_name + "\\" + paradigm_name + "\\" + session_number;
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
  Axios.post('http://localhost:5555/directory/select-file-in-folder', options_folder)
    .then(response => {
      setList(response.data)
      console.log(response.data);
      if (response.data.length > zero) {
        setIsButtonDisabled(false);
      }
      else {
        setIsButtonDisabled(true);
        setOutput("No analyzed videos found for graph plotting.")
      }

    })
    .catch(error => {
      if (error.response && error.response.status === 404) {
        setIsButtonDisabled(true);
        setOutput("No analyzed videos found for graph plotting.")
        setOutput('Resource not found'); // Handle 404 error from the backend
        return;
      } else if (!error.ok) {
        setOutput('Failed to fetch data'); // Handle other non-OK responses
      }
    });
}


  // Example usage
  // const directoryPath = 'C:\\\\';
  let path = selectedDirectory + animal_name + "\\" + paradigm_name + "\\" + session_number;
  // let response;
  let resultSection = null; // Initialize result section to null

  if (!selectedFolder) {
    resultSection = <p>Running Section:</p>; // Display "Result Section" if folder is not chosen
  }
  // else {
  //   getFiles();
  // }

  const handleSelectChangePara = (event) => {
    setSessions(null)
    session_number = null;
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
    setIsButtonDisabled(true);
    setIsVisible(false)
    setOutput(null)
    document.getElementById("python").innerHTML = "";

    if (animal_name != null && paradigm_name != null && session_number == null) {
      const path = selectedDirectory + animal_name + "\\" + paradigm_name;
      setSelectedFolder(path);
      console.log(path)
      const data = { name: path }; // Object with key "name" and value "path"
      const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      Axios.post('http://localhost:5555/directory/sessions', options)
      .then(sessions => {
        console.log("Session data is: ", sessions.data);
        setSessions(sessions.data)
        if (animal_name != null && paradigm_name != null && session_number != null) {
          console.log("Entered the big place");
          console.log("Session number is: ", session_number);
          const path = selectedDirectory + animal_name + "\\" + paradigm_name + "\\" + session_number;
          setIsButtonDisabled(false);
          setSelectedFolder(path);
          getFiles();
          console.log("folder is: ",selectedFolder); }
      })
      .catch(err => {
        setSessions(null)
        session_number = null;
        setOutput("Resource not found")
        console.log(err)})
    }  
  };
  
  const handleSelectChangeAni = (event) => {
    setSessions(null)
    session_number = null;
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
    setIsButtonDisabled(true);
    setIsVisible(false)
    setOutput(null)
    document.getElementById("python").innerHTML = "";
    // console.log(selectedName)
    if (animal_name != null && paradigm_name != null && session_number == null) {
      const path = selectedDirectory + animal_name + "\\" + paradigm_name;
      setSelectedFolder(path);
      console.log("changed pathhhh")
      console.log(path)
      const data = { name: path }; // Object with key "name" and value "path"
      const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      Axios.post('http://localhost:5555/directory/sessions', options)
      .then(sessions => {
        console.log("Session data is: ", sessions.data);
        setSessions(sessions.data)
        if (animal_name != null && paradigm_name != null && session_number != null) {
          console.log("Entered the big place");
          console.log("Session number is: ", session_number);
          const path = selectedDirectory + animal_name + "\\" + paradigm_name + "\\" + session_number;
          setIsButtonDisabled(false);
          setSelectedFolder(path);
          getFiles();
          console.log("folder is: ",selectedFolder); }
      })
      .catch(err => {
        setSessions(null)
        session_number = null;
        setOutput("Resource not found")
        console.log(err)})
    } 
  };

  const handleSelectChangeSess = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedName = event.target[selectedIndex].text;
    // console.log(selectedName)
    if (selectedName === "select session") {
      console.log("Entered if")
      session_number = null
      setSelectedFolder(null)
      console.log("folder is: ",selectedFolder);
    }
    else {
      session_number = selectedName
      console.log(session_number)
    }
    setIsButtonDisabled(true);
    setIsVisible(false)
    document.getElementById("python").innerHTML = "";
    if (animal_name != null && paradigm_name != null && session_number != null) {
      const path = selectedDirectory + animal_name + "\\" + paradigm_name + "\\" + session_number;
      setIsButtonDisabled(false);
      setSelectedFolder(path);
      getFiles();
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

useEffect(() => {
  localStorage.setItem('selectedDirectory', selectedDirectory);
}, [selectedDirectory]);


// useEffect(()=> {  
//   // here we get the data by requesting data from this link
//   // to our nodejs server
//   Axios.get('http://localhost:5555/directories/session')
//   .then(sessions => setSessions(sessions.data))
//   .catch(err => console.log(err))
// }, []);

  useEffect(()=> {
    
    console.log(path) 
    // setSelectedFolder(null);
    const data = { name: config_path }; // Object with key "name" and value "path"
    const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
    Axios.post('http://localhost:5555/python/select-body-part', options)
      .then(response => {
        setListBodyParts(response.data.body_parts)
        console.log(response.data.body_parts);
        // handleSaveContinue();
        // if (response.data.length > zero) {
        //   setIsButtonDisabled(false);
        // }
        // else {
        //   setIsButtonDisabled(true);
        //   setOutput("No analyzed videos found for graph plotting.")
        // }
      })
      .catch(err => console.log(err))
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

// Function to handle radio button change
const handleRadioChange = (event) => {
  setSelectedOption(event.target.value);
  console.log(selectedOption);
};

// Function to handle radio button change
const handleRadioChangeBodyPart = (event) => {
  setSelectedBodyPartOption(event.target.value);
  console.log(selectedBodyPartOption);
};


  const fetchData = async () => {
      try {
          if(animal_name == null || paradigm_name == null || session_number == null) {
            setIsVisible(true);
            return;
          }
          setIsVisible(false);
          path = selectedDirectory + animal_name + "\\" + paradigm_name + "\\" + session_number;
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
          Axios.post('http://localhost:5555/directory/select-folder', options_folder)
            .catch(err => console.log(err))
          
          const data = { config: config_path, videos: path }; // Object with key "name" and value "path"
          const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          };
          setOutput("")
          document.getElementById("python").innerHTML = "Analyzing video(s)";
          document.getElementById("spinner").style.display = "block"

          Axios.post('http://localhost:5555/python/run-python-script', options)
          .then(response => {
            // Handle successful response
            if (response.data.exitCode === zero) {
              setOutput('Analysis completed successfully')
              document.getElementById('spinner').style.display = "none"
              document.getElementById("python").innerHTML = "";
            }
            else if (response.data.exitCode === one && flag_kill === zero) {
              setOutput('Running a new session... ')
            }
            else {
              flag_kill = zero
              setOutput('Analysis failed, please restart the session... ')
              document.getElementById('spinner').style.display = "none"
              document.getElementById("python").innerHTML = "";
            }
            
          })
          .catch (error => {
            if (error.response && error.response.status === 404) {
              setOutput('Resource error: ' + error.response.data.message); // Handle 404 error from the backend
              console.log(output);
            } else if (!error.ok) {
              setOutput('Failed to fetch data: ' + error.message); // Handle other non-OK responses
              console.log(output);
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
    Axios.post('http://localhost:5555/python/stop-process')
      .then(response => {
        console.log(response.data.message);
        setIsVisible(false)
        flag_kill = one
        // setOutput('command output is: ')
        // setOutput('Analysis failed, please restart the session... ')
        // document.getElementById('spinner').style.display = "none"
        // document.getElementById("python").innerHTML = "";
      })
      .catch(error => {
        console.error('Error stopping process:', error);
      });
  }

 
  /**
 * @todo Check the networkerror that happens if i try to send a non existing file and than existing
 * @todo Implement this function.
 */

  const createCSV = async () => {
    let newPath = changeInfoToAnalysis();
    let savingPath = newPath + animal_name + "\\" + paradigm_name + "\\" + session_number;
    path = selectedDirectory + animal_name + "\\" + paradigm_name + "\\" + session_number;
          console.log(path) 
          // setSelectedFolder(null);
          const data_folder = { name: path, save: savingPath }; // Object with key "name" and value "path"
          const options_folder = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data_folder)
        };
    setOutput("")
    document.getElementById("python").innerHTML = "Creating csv (excel) files";
    document.getElementById("spinner").style.display = "block"
    Axios.post('http://localhost:5555/python/create-csv', options_folder)
      .then(response => {
        if (response.data.exitCode === zero) {
          setOutput('Files created successfully:\n' + response.data.output);
          document.getElementById('spinner').style.display = "none"
          document.getElementById("python").innerHTML = "";
        }
        else if (response.data.exitCode === one) {
          setOutput('Running a new session... ')
        }
        // flag_kill = one
        // setOutput('command output is: ')
        // setOutput('Analysis failed, please restart the session... ')
        // document.getElementById('spinner').style.display = "none"
        // document.getElementById("python").innerHTML = "";
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
      // flag_kill = zero
  }


  return (
    
    <div className="index">
  <div className="div-3">
    <div className="overlap">
      <div className="a-mouse-from-th-wrapper">
      </div>
      <div className="text-wrapper-10" style={{ backgroundColor: 'rgba(49, 63, 71, 0.3)' }}>
        <div className="alert alert-success text-wrapper-6" role="alert" >
          <p>Please choose both paradigm and animal before pressing the "run" button. Results will appear in the corresponding directory.</p>
          {/* <input directory="" webkitdirectory="" type="file" /> */}
          <div style={{ display: 'inline-block' }}>
            {selectedDirectory && (
              <p style={{ display: 'inline', marginRight: '10px' }}>Relative path is: {selectedDirectory}</p>
            )}
            <Button className='btn btn-outline-secondary' variant='light' size="sm" onClick={handleShow}><BsPencil size={16} /></Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Change relative path for videos</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control
                      type="text"
                      placeholder="computer://your_new_path"
                      value={pathInput}
                      onChange={(e) => setPathInput(e.target.value)}
                      autoFocus
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer className="my-3 d-flex justify-content-between align-items-center">
                <Button className='btn btn-outline-dark' variant='light' size="lg" onClick={handleClose}><BsBoxArrowInLeft /></Button>
                <Button className='btn btn-outline-dark' variant='light' size="lg" onClick={handleSaveChanges}><VscSend /></Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
        <div className="text-wrapper-4" >
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
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <Button name="options" id="option1" className='btn btn-outline-dark' variant='light' size="lg" data-toggle="tooltip" data-placement="top" title="add" onClick={navigateToCreateParadigm}><VscAdd /></Button>
            <Button name="options" id="option2" className='btn btn-outline-dark' variant='light' size="lg" data-toggle="tooltip" data-placement="top" title="delete" onClick={navigateToDeleteParadigm}><VscChromeMinimize /></Button>
          </div>
        </div>
        <div className="text-wrapper-7" >
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
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <Button name="options" id="option1" className='btn btn-outline-dark' variant='light' size="lg" data-toggle="tooltip" data-placement="top" title="add" onClick={navigateToCreateAnimal}><VscAdd /></Button>
            <Button name="options" id="option2" className='btn btn-outline-dark' variant='light' size="lg" data-toggle="tooltip" data-placement="top" title="delete" onClick={navigateToDeleteAnimal}><VscChromeMinimize /></Button>
          </div>
        </div>
        <div className="text-wrapper-11" >
          <label htmlFor="session">Session:</label>
          <select
            id="session"
            className="form-select"
            style={{ marginRight: '130px' }}
            onChange={handleSelectChangeSess}
          >
            <option value="">select session</option>
            {sessions !== null && sessions.map((session, index) => (
              <option key={index}>{session}</option>
            ))}
          </select>
          {/* <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <Button name="options" id="option1" className='btn btn-outline-dark' variant='light' size="lg" data-toggle="tooltip" data-placement="top" title="add" onClick={navigateToCreateAnimal}><VscAdd /></Button>
            <Button name="options" id="option2" className='btn btn-outline-dark' variant='light' size="lg" data-toggle="tooltip" data-placement="top" title="delete" onClick={navigateToDeleteAnimal}><VscChromeMinimize /></Button>
          </div> */}
          </div>
        <div className="alert alert-success text-wrapper-5" role="alert" >
          {selectedFolder && (
            <div>
              Selected Folder: {selectedFolder}
              <hr />
            </div>
          )}
          <pre className="result-text">{resultSection}</pre>
          <p id="python"></p>
          <Spinner id='spinner' animation="border" role="status"></Spinner>
          <div>
            <pre>{output}</pre>
          </div>
        
        {/* <div className="alert alert-success text-wrapper-10" role="alert"></div> */}
        <div >
          {isVisible && <div className="alert alert-danger" role="alert">Fill both paradigm and animal name!</div>}
          <div className="my-3 d-flex justify-content-between align-items-center">
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            {/* <label class="btn btn-dark"> */}
            <Button className='btn btn-outline-light' name="options" id="option3" variant="dark" size="lg" type='submit' data-toggle="tooltip" data-placement="top" title="download csv files" autoComplete="off" onClick={() => createCSV()} disabled={isButtonDisabled}><VscGraph size={20}/> Save</Button>
            <Button className='btn btn-outline-light' name="options" id="option4" variant="dark" size="lg" type='submit' data-toggle="tooltip" data-placement="top" title="create graph" autoComplete="off" onClick={() =>  toggleModal()} disabled={isButtonDisabled}><VscGraphLine size={20}/> Plot</Button>
            {/* </label> */}
            <Modal show={showModal} onHide={toggleModal} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Choose videos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        {list.map((item, index) => (
                            <Form.Check
                                key={index}
                                type="radio"
                                id={`radio-${index}`}
                                label={item}
                                value={item}
                                checked={selectedOption === item}
                                onChange={handleRadioChange}
                            />
                        ))}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                {isVisibleModal && <div className="alert alert-danger" role="alert">Choose video to analyze!</div>}
                <Modal.Footer className="my-3 d-flex justify-content-between align-items-center">
                <Button className='btn btn-outline-dark' variant='light' size="lg" onClick={toggleModal}><BsBoxArrowInLeft /></Button>
                <Button className='btn btn-outline-dark' variant='light' size="lg" onClick={handleSave}><VscSend /></Button>
              </Modal.Footer>
            </Modal>
            <Modal show={showBodyPartsModal} onHide={toggleBodyPartModal} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Choose bodypart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        {listBodyParts.map((item, index) => (
                            <Form.Check
                                key={index}
                                type="radio"
                                id={`radio-${index}`}
                                label={item}
                                value={item}
                                checked={selectedBodyPartOption === item}
                                onChange={handleRadioChangeBodyPart}
                            />
                        ))}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                {isVisibleModal && <div className="alert alert-danger" role="alert">Choose body part to analyze!</div>}
                <Modal.Footer className="my-3 d-flex justify-content-between align-items-center">
                <Button className='btn btn-outline-dark' variant='light' size="lg" onClick={toggleBodyPartModal}><BsBoxArrowInLeft /></Button>
                <Button className='btn btn-outline-dark' variant='light' size="lg" onClick={handleBodyPartSave}><VscSend /></Button>
              </Modal.Footer>
            </Modal>
          </div>
          {/* <div dangerouslySetInnerHTML={{ __html: htmlContent }} /> */}
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <Button className='btn btn-outline-light' name="options" id="option1" variant="dark" size="lg" type='radio' data-toggle="tooltip" data-placement="top" title="run deeplabcut" autoComplete="off" onClick={() => fetchData()} disabled={isButtonDisabled}><VscPlay size={20}/> Run</Button>
            <Button className='btn btn-outline-light' name="options" id="option2" variant="dark" size="lg" type='submit' data-toggle="tooltip" data-placement="top" title="stop deeplabcut" autoComplete="off" onClick={() => killPython()} disabled={isButtonDisabled}><VscPrimitiveSquare size={20}/> Stop</Button>
          </div>
          </div>
        </div>
        <style>

</style>
{/* <html src={require('../graphs.html')} ></html> */}
{/* <div id="fig_el2598423651230991367213487935"></div> */}
        
      </div>
    </div>
    </div>
    <img
      className="deepbrain-logo"
      alt="Deepbrain logo"
      src={require('../images/deepbrain-logo.jpg')}
    />
  </div>
</div>

    
  );
}

export default Home