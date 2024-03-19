import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../App.css'
import Axios from 'axios';
import { VscTrash, VscSend } from "react-icons/vsc";
import { BsArrowBarLeft } from "react-icons/bs";

const DeleteAnimal = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [animals, setAnimals] = useState([])
    const [isVisible, setIsVisible] = useState(false);
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [showModal, setShowModal] = useState(false);

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

    const handleClose = () => setShowModal(false);

    const handleShow = () => setShowModal(true);

    const handleSelectChangeAni = (event) => {
        const selectedIndex = event.target.selectedIndex;
        const selectedName = event.target[selectedIndex].text;
        setSelectedAnimal(selectedName !== "select animal" ? selectedName : null);
        setIsVisible(false);
    };

    const handleDelete = async () => {
        try {
            await Axios.delete(`http://localhost:5555/animals/${selectedAnimal}`);
            // If the request succeeds, navigate to the home page
            navigateToHome();
        } catch (error) {
            console.log(error);
        }
        setShowModal(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!selectedAnimal) {
            setIsVisible(true);
            return;
        }
        handleShow();
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
                    <hr />
                    <select className="form-select" onChange={handleSelectChangeAni}>
                        <option value="">select animal</option>
                        {animals.map((animal, index) => (
                            <option key={index}>
                                {animal.name}
                            </option>
                        ))}
                    </select>
                    <div className="my-3">
                        {isVisible && <div className="alert alert-danger" role="alert">Select animal!</div>}
                        <Button className='btn btn-outline-dark' variant='light' size="lg" onClick={navigateToHome}><BsArrowBarLeft /></Button>
                        <Button className='btn btn-outline-dark' variant='light' size="lg" onClick={handleSubmit}><VscSend /></Button>
                    </div>
                </div>
                <img
                    className="deepbrain-logo"
                    alt="Deepbrain logo"
                    src={require('../images/deepbrain-logo.jpg')}
                />
            </div>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete {selectedAnimal}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        <BsArrowBarLeft />
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        <VscTrash />
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default DeleteAnimal