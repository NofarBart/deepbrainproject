import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import '../App.css'
import Axios from 'axios';

const CreateParadigm = () => {
    const [formData, setFormData] = useState({
        name: "",
        animalsNumber: "",
        errors: {},
      });

      useEffect(() => {
        console.log("Updated formData:", formData);
    }, [formData]); // This effect will be triggered whenever formData changes

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
    
        setFormData((prevState) => ({ ...prevState, errors }));
    
        // Return true if there are no errors
        return Object.keys(errors).length === 0;
      };
    
      const handleSubmit = (event) => {
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
          Axios.post('http://localhost:5555/paradigms', data)
            .catch(err => console.log(err))
        } else {
          // Form is invalid, do nothing
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
          <form id="myForm" onSubmit={handleSubmit}>
            <div className="form-row align-items-center alert alert-success text-wrapper-9">
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
                <div className="my-3">
                {/* <input type="submit" /> */}
                <Button className='btn btn-outline-dark' variant='light' size="lg" type='submit' value="submit">Submit</Button>
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