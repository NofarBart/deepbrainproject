import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema;
export const paradigmSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, 'Please add a paradigm name'],
            maxlength: 32,
            unique: true
        },
        animalsNumber: {
            type: Number,
            required: [true, 'Please add a number of animals'],
            min: 1,
            validate : {
                validator : Number.isInteger,
                message   : '{VALUE} is not an integer value'
            },
        
        },
    },
    {
        timestamps: true,
    }
);

export const Paradigm = mongoose.model("Paradigm", paradigmSchema);