import express from 'express';
const animalRouter = express.Router();
import { Animal } from '../models/animal.js';

//route for save a new Paradigm
animalRouter.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).send({
                message: 'Send all required fields: name',
            });
        }
        const newAnimal = {
            name: name,
            // animalsNumber: animalsNumber,
            // bodyParts: req.body.bodyParts,
        };
        const animal = await Animal.create(newAnimal);
        return res.status(201).send(animal);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});
// animalRouter.post('/', async (req, res) => {
//     try {
//         if (
//             !req.body.name ||
//             !req.body.age ||
//             !req.body.bodyParts
//         ) {
//             return res.status(400).send({
//                 message: 'Send all required fields: name, animalsNumber, bodyParts',
//             })
//         }
//         const newAnimal = {
//             name: req.body.name,
//             // dateStarted: new Date(),
//             animalsNumber: req.body.animalsNumber,
//             bodyParts: req.body.bodyParts,
//         };
//         const paradigm = await Paradigm.create(newParadigm);
//         return res.status(201).send(paradigm);
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message });
//     }
// });

//route for get all paradigms from database

animalRouter.get('/', async (req, res) => {
    Animal.find()
        .then(animals => res.json(animals))
        .catch(err => res.json(err))
    // try {
    //     const paradigms = await Paradigm.find({});
    //     return res.status(200).json({
    //         count: paradigms.length,
    //         data: paradigms
    //     });
    // } catch (error) {
    //     console.log(error.message);
    //     res.status(500).send({ message: error.message });
    // }
});

// //route for get one paradigm from database by id

// paradigmRouter.get('/:id', async (req, res) => {
//     try {

//         const { id } = req.params;

//         const paradigm = await Paradigm.findById(id);
//         return res.status(200).json(paradigm);
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message });
//     }
// });

// //route for update a paradigm in database

// paradigmRouter.put('/:id', async (req, res) => {
//     try {
//         if (
//             !req.body.name ||
//             !req.body.animalsNumber ||
//             !req.body.bodyParts
//         ) {
//             return res.status(400).send({
//                 message: 'Send all required fields: name, animalsNumber, bodyParts',
//             })
//         }
//         const { id } = req.params;
//         const result = await Paradigm.findByIdAndUpdate(id, req.body);
//         if (!result) {
//             return res.status(404).send({
//                 message: 'Paradigm not found',
//             })
//         }
//         return res.status(200).send({
//             message: 'Paradigm updated successfully',
//         })
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message });
//     }
// });

// //route for delete a paradigm in database

// paradigmRouter.delete('/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const result = await Paradigm.findByIdAndDelete(id, req.body);
//         if (!result) {
//             return res.status(404).send({
//                 message: 'Paradigm not found',
//             })
//         }
//         return res.status(200).send({
//             message: 'Paradigm deleted successfully',
//         })
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message });
//     }
// });

export default animalRouter;