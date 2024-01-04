const Animal = require("../models/animal");
exports.createAnimal = async (req, res, next)=> {

    // const {name} = req.body;
    // const animalExist = await Paradigm.findOne({name});
    // if(animalExist) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Animal already exists" 
    //     })
    // }
    try {
        const animal = await Animal.create(req.body)
        res.status(201).json({
            success: true,
            animal
        }) //paradigm was successfully created
        // res.json({message: "checking again- controller user is working"})
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
};

exports.displayAnimal = async (req, res, next)=> {

    try {
        const animals = await Animal.find().populate('paradigm');
        res.status(201).json({
            success: true,
            animals
        }) //paradigm was successfully created
        // res.json({message: "checking again- controller user is working"})
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
};