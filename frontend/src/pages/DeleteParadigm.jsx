import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import '../App.css'
import Axios from 'axios';

const DeleteParadigm = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [paradigms, setParadigms] = useState([])
    const [isVisible, setIsVisible] = useState(false);
    const [selectedParadigm, setSelectedParadigm] = useState(null);

    let paradigm_name;
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

    const handleSelectChangePara = (event) => {
        const selectedIndex = event.target.selectedIndex;
        const selectedName = event.target[selectedIndex].text;
        setSelectedParadigm(selectedName !== "select paradigm" ? selectedName : null);
        setIsVisible(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.preventDefault();
        if (!selectedParadigm) {
            setIsVisible(true);
            return; // Exit early if no paradigm is selected
        }
        try {
            await Axios.delete(`http://localhost:5555/paradigms/${selectedParadigm}`);
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
                <select className="form-select" onChange={handleSelectChangePara}>
                        <option value="">select paradigm</option>
                        {paradigms.map((paradigm, index) => (
                            <option key={index}>
                                {paradigm.name}
                            </option>
                        ))}
                    </select>
                <div className="my-3">
                {/* <input type="submit" /> */}
                {isVisible && <div className="alert alert-danger" role="alert">Select paradigm!</div>}
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

export default DeleteParadigm