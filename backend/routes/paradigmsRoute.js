import express from 'express';
const paradigmRouter = express.Router();
import { Paradigm } from '../models/paradigm.js';


//route for create csv file

// paradigmRouter.post('/export', async (req, res) => {
    
//     try {
//         var paradigmData = await Paradigm.find({}, {_id:0, createedAt:0, updatedAt:0, __v:0}, (err, paradigm) => {
//         // console.log("paradigm",paradigm);
//         })
//         // const fields = ['name', 'number of animals'];
//         // const opts = { fields };
//         // const csv = parse(paradigm, opts);
//         // fs.writeFile("paradigm1.csv", csv, function(error) {
//         //     if(error) throw error;
//         //     console.log("Writing was a success!");
//         // });
//         // console.log(csv);
//     } catch(err) {
//             res.status(500).send({ message: err.message });
//         }
//     // })
// });

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
            // bodyParts: req.body.bodyParts,
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

//route for delete a paradigm in database

paradigmRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Paradigm.findByIdAndDelete(id, req.body);
        if (!result) {
            return res.status(404).send({
                message: 'Paradigm not found',
            })
        }
        return res.status(200).send({
            message: 'Paradigm deleted successfully',
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default paradigmRouter;