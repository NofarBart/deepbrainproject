import express from 'express';
const animalRouter = express.Router();
import { Animal } from '../models/animal.js';

//route for save a new Paradigm
animalRouter.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).send({
                message: 'Send all required fields: name'
            });
        }
        const newAnimal = {
            name: name
        };
        const animal = await Animal.create(newAnimal);
        return res.status(201).send(animal);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

animalRouter.delete('/:name', async (req, res) => {
    try {
        const { name } = req.params; // Extract name from req.params
        const result = await Animal.findOneAndDelete({ name: name });
        if (!result) {
            return res.status(404).send({
                message: 'Animal not found'
            });
        }
        return res.status(200).send({
            message: 'Animal deleted successfully'
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//route for get all paradigms from database

animalRouter.get('/', async (req, res) => {
    Animal.find()
        .then(animals => res.json(animals))
        .catch(err => res.json(err))
});


export default animalRouter;