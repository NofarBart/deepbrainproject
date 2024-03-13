import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import '../App.css'
import Axios from 'axios';

const DeleteAnimal = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [animals, setAnimals] = useState([])
    const [isVisible, setIsVisible] = useState(false);
    const [selectedAnimal, setSelectedAnimal] = useState(null);

    let animal_name;
    useEffect(()=> {  
        // here we get the data by requesting data from this link
        // to our nodejs server
        Axios.get('http://localhost:5555/animals')
        .then(animals => setAnimals(animals.data))
        .catch(err => console.log(err))
    }, []);

    const navigateToHome = () => {
        // 👇️ navigate to /contacts
        navigate('/');
      };

    const handleSelectChangeAni = (event) => {
        const selectedIndex = event.target.selectedIndex;
        const selectedName = event.target[selectedIndex].text;
        setSelectedAnimal(selectedName !== "select animal" ? selectedName : null);
        setIsVisible(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.preventDefault();
        if (!selectedAnimal) {
            setIsVisible(true);
            return; // Exit early if no paradigm is selected
        }
        try {
            await Axios.delete(`http://localhost:5555/animals/${selectedAnimal}`);
            // If the request succeeds, navigate to the home page
            navigateToHome();
        } catch (error) {
            console.log(error);
        }
      };

   
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
                <div className="form-row align-items-center alert alert-success text-wrapper-9">
                <h4>Please fill the fields below: </h4>
                <hr></hr>
                <select className="form-select" onChange={handleSelectChangeAni}>
                        <option value="">select animal</option>
                        {animals.map((animal, index) => (
                            <option key={index}>
                                {animal.name}
                            </option>
                        ))}
                    </select>
                <div className="my-3">
                {/* <input type="submit" /> */}
                {isVisible && <div className="alert alert-danger" role="alert">Select animal!</div>}
                <Button className='btn btn-outline-dark' variant='light' size="lg" onClick={handleSubmit}>Submit</Button>
                <Button className='btn btn-outline-dark' variant='light' size="lg" onClick={navigateToHome}>Cancel</Button>
                </div>
            </div>
            {/* </form> */}
          <img
            className="deepbrain-logo"
            alt="Deepbrain logo"
            src={require('../images/deepbrain-logo.jpg')}
          />
          {/* <li>
              <Link to="/create">Contact</Link>
          </li> */}
          
        </div>
      </div>
    )
}

export default DeleteAnimal