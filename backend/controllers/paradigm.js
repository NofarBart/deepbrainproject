const Paradigm = require("../models/paradigm");
exports.createParadigm = async (req, res, next)=> {

    const {name} = req.body;
    const paradigmExist = await Paradigm.findOne({name});
    if(paradigmExist) {
        return res.status(400).json({
            success: false,
            message: "Paradigm already exists" 
        })
    }
    try {
        const paradigm = await Paradigm.create(req.body)
        res.status(201).json({
            success: true,
            paradigm
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