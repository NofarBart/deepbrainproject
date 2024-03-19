import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import '../App.css'
import Axios from 'axios';
import { BsArrowBarLeft } from "react-icons/bs";
import { VscSend } from "react-icons/vsc";

const CreateAnimal = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [animals, setAnimals] = useState([])
    const [formData, setFormData] = useState({
        name: "",
        animalsNumber: "",
        errors: {},
      });

      useEffect(() => {
        console.log("Updated formData:", formData);
    }, [formData]); // This effect will be triggered whenever formData changes

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

    function checkString(string) {
        return /^[0-9]*$/.test(string);
    }

      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
        console.log(formData);
      };

      const validateForm = () => {
        const errors = {};
    
        // Check if username is empty
        if (!formData.name) {
          errors.name = "Name is required";
        }

        animals.map(((animal, index) => {
            if (animal.name === formData.name) {
                errors.name = "Can't use the same name twice";
            }  
        }));
    
        // // Check if password is empty
        // if (!formData.animalsNumber) {
        //   errors.animalsNumber = "Number is required";
        // }

        // if (!checkString(formData.animalsNumber)) {
        //     errors.animalsNumber = "Input needs to be a number";
        // }
    
        setFormData((prevState) => ({ ...prevState, errors }));
    
        // Return true if there are no errors
        return Object.keys(errors).length === 0;
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
          // Form is valid, submit data
          console.log(formData);
          const data = { name: formData.name, animalsNumber: formData.animalsNumber }; // Object with key "name" and value "path"
          console.log("Data is: ", data);
        try {
            await Axios.post('http://localhost:5555/animals', data);
            // If the request succeeds, navigate to the home page
            navigateToHome();
        } catch (error) {
            console.log(error);
        }
      };}

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
          <form id="myForm"  className="form-row align-items-center alert alert-success text-wrapper-9" onSubmit={handleSubmit}>
            <div>
                <h4>Please fill the fields below: </h4>
                <hr></hr>
                <div className="my-3">
                <label className="sr-only my-3" htmlFor="name">Name of animal: </label>
                <input type="text" className="form-control" name="name" id="name" 
                    value={formData.name} onChange = {handleChange} placeholder="Name with letters and digits"></input>
                    
                </div>
                {formData.errors.name && (
                    <p style={{ color: "#D37676" }}>{formData.errors.name}</p> )}
                
                {/* <div class="col-auto my-1">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="autoSizingCheck2"></input>
                    <label class="form-check-label" for="autoSizingCheck2">
                    Remember me
                    </label>
                </div>
                </div> */}
                <div className="my-3">
                {/* <input type="submit" /> */}
                <Button className='btn btn-outline-dark' variant='light' size="lg" onClick={navigateToHome}><BsArrowBarLeft /></Button>
                <Button className='btn btn-outline-dark' variant='light' size="lg" type='submit' value="submit"><VscSend /></Button>
                </div>
            </div>
            </form>
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

export default CreateAnimal