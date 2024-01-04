const mongoose = require('mongoose');

//create relationship between paradigm and animal

const {ObjectId} = mongoose.Schema;

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please add an animal name'],
        maxlength: 32,
        unique: true
    },
    age: {
        type: Number,
        required: [true, 'Please add an age in weeks'],
        min: 0,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    species: {
        type: String,
        trim: true,
        required: [true, 'Please add species name'],
        maxlength: 32,
        unique: true
    },
    sex: {
        type: Number,
        required: [true, 'Please add a if female(0) or male(1)'],
        min: 0,
        max: 1,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    healthy: {
        type: Boolean,
        required: [true, 'Animal must be a female(0) or a male(1)']
    },
    paradigm_id: {
        type: ObjectId,
        ref: "Paradigm",
        required: [true, 'Animal must have a paradigm']
    }
});

module.exports = mongoose.model("Animal", animalSchema);