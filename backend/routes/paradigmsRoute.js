import express from 'express';
const paradigmRouter = express.Router();
import { Paradigm } from '../models/paradigm.js';

//route for save a new Paradigm

paradigmRouter.post('/', async (req, res) => {
    try {
        const { name, animalsNumber } = req.body;
        if (!name || !animalsNumber) {
            return res.status(400).send({
                message: 'Send all required fields: name, animalsNumber',
            });
        }
        const newParadigm = {
            name: name,
            animalsNumber: animalsNumber,
        };
        const paradigm = await Paradigm.create(newParadigm);
        return res.status(201).send(paradigm);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//route for get all paradigms from database

paradigmRouter.get('/', async (req, res) => {
    Paradigm.find()
        .then(paradigms => res.json(paradigms))
        .catch(err => res.json(err))
});

// //route for get one paradigm from database by id

paradigmRouter.get('/:id', async (req, res) => {
    try {

        const { id } = req.params;

        const paradigm = await Paradigm.findById(id);
        return res.status(200).json(paradigm);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//route for update a paradigm in database

paradigmRouter.put('/:id', async (req, res) => {
    try {
        if (
            !req.body.name ||
            !req.body.animalsNumber ||
            !req.body.bodyParts
        ) {
            return res.status(400).send({
                message: 'Send all required fields: name, animalsNumber, bodyParts',
            })
        }
        const { id } = req.params;
        const result = await Paradigm.findByIdAndUpdate(id, req.body);
        if (!result) {
            return res.status(404).send({
                message: 'Paradigm not found',
            })
        }
        return res.status(200).send({
            message: 'Paradigm updated successfully',
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

paradigmRouter.delete('/:name', async (req, res) => {
    try {
        const { name } = req.params; // Extract name from req.params
        const result = await Paradigm.findOneAndDelete({ name: name });
        if (!result) {
            return res.status(404).send({
                message: 'Paradigm not found',
            });
        }
        return res.status(200).send({
            message: 'Paradigm deleted successfully',
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default paradigmRouter;