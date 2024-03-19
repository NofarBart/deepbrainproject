import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'; // Import Modal from react-bootstrap
import '../App.css';
import Axios from 'axios';
import { VscTrash, VscSend } from "react-icons/vsc";
import { BsArrowBarLeft } from "react-icons/bs";

const DeleteParadigm = () => {
    const navigate = useNavigate();
    const [paradigms, setParadigms] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [selectedParadigm, setSelectedParadigm] = useState(null);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    useEffect(() => {
        Axios.get('http://localhost:5555/paradigms')
            .then(response => setParadigms(response.data))
            .catch(err => console.log(err));
    }, []);

    const navigateToHome = () => {
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
        if (!selectedParadigm) {
            setIsVisible(true);
            return;
        }
        setShowModal(true); // Show modal to confirm deletion
    };

    const handleDelete = async () => {
        try {
            await Axios.delete(`http://localhost:5555/paradigms/${selectedParadigm}`);
            setShowModal(false); // Close modal
            navigateToHome();
        } catch (error) {
            console.log(error);
        }
    };

    const handleClose = () => {
        setShowModal(false); // Close modal without deleting
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
                    <select className="form-select" onChange={handleSelectChangePara}>
                        <option value="">select paradigm</option>
                        {paradigms.map((paradigm, index) => (
                            <option key={index}>{paradigm.name}</option>
                        ))}
                    </select>
                    <div className="my-3">
                        {isVisible && <div className="alert alert-danger" role="alert">Select paradigm!</div>}
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

            {/* Modal for confirmation */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete {selectedParadigm}?</Modal.Body>
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

export default DeleteParadigm;
