import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import '../App.css'
import Axios from 'axios';
import { BsArrowBarLeft } from "react-icons/bs";
import { VscSend } from "react-icons/vsc";

const CreateParadigm = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [paradigms, setParadigms] = useState([])
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
        Axios.get('http://localhost:5555/paradigms')
        .then(paradigms => setParadigms(paradigms.data))
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
    
        // Check if password is empty
        if (!formData.animalsNumber) {
          errors.animalsNumber = "Number is required";
        }

        if (!checkString(formData.animalsNumber)) {
            errors.animalsNumber = "Input needs to be a number";
        }

        paradigms.map(((paradigm, index) => {
            if (paradigm.name === formData.name) {
                errors.name = "Can't use the same name twice";
            }  
        }));
    
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

        //   const options_folder = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // };
        try {
            await Axios.post('http://localhost:5555/paradigms', data);
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
                <label className="sr-only my-3" htmlFor="name">Name of paradigm: </label>
                <input type="text" className="form-control" name="name" id="name" 
                    value={formData.name} onChange = {handleChange} placeholder="Name with letters and digits"></input>
                    
                </div>
                {formData.errors.name && (
                    <p style={{ color: "#D37676" }}>{formData.errors.name}</p> )}
                <div className="my-5">
                <label className="sr-only my-3" htmlFor="animalsNumber">Number of animals: </label>
                <div className="input-group">
                    <div className="input-group-prepend">
                    <div className="input-group-text">#</div>
                    </div>
                    <input type="text" className="form-control" name="animalsNumber" id="animalsNumber"
                        value={formData.animalsNumber} onChange = {handleChange} placeholder="Number, for example 3"></input>
                        
                </div>
                {formData.errors.animalsNumber && (
                        <p className="my-3" style={{ color: "#D37676" }}>{formData.errors.animalsNumber}</p>)}
                </div>
                
                {/* <div class="col-auto my-1">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="autoSizingCheck2"></input>
                    <label class="form-check-label" for="autoSizingCheck2">
                    Remember me
                    </label>
                </div>
                </div> */}
                <div className="my-3 d-flex justify-content-between align-items-center">
                {/* <input type="submit" /> */}
                <Button className='btn btn-outline-dark' variant='light' size="lg" data-toggle="tooltip" data-placement="top" title="return" onClick={navigateToHome}><BsArrowBarLeft /></Button>
                <Button className='btn btn-outline-dark' variant='light' size="lg" type='submit' value="submit" data-toggle="tooltip" data-placement="top" title="send"><VscSend /></Button>
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

export default CreateParadigm