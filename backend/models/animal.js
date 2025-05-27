import mongoose from 'mongoose';

const {ObjectId} = mongoose.Schema;

export const animalSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, 'Please add an animal name'],
            maxlength: 32,
            unique: true
        },
    },
    {
        timestamps: true,
    }
);

export const Animal = mongoose.model("Animal", animalSchema);