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
        // dateStarted: {
        //     type: Date,
        //     default: new Date(), //this only returns one specific time which is server start time 
        // },
        animalsNumber: {
            type: Number,
            required: [true, 'Please add a number of animals'],
            min: 1,
            validate : {
                validator : Number.isInteger,
                message   : '{VALUE} is not an integer value'
            },
        
        },
        // bodyParts: {
        //     type: [Number],
        //     default: [0],
        //     required: [true, 'Please add body parts to analyze']
        // },
        // Animals: [{
        //     type: ObjectId,
        //     ref: "Animal",
        //  }]
    },
    {
        timestamps: true,
    }
);

export const Paradigm = mongoose.model("Paradigm", paradigmSchema);