import express from "express";
import { PORT, DATABASE } from "./config.js";
import mongoose from 'mongoose';
import cors from 'cors';
import paradigmRouter from './routes/paradigmsRoute.js'
import animalRouter from "./routes/animalsRoute.js";
// import directoryRouter from "./routes/directoryRoute.js";

import { Paradigm } from "./models/paradigm.js"

const app = express();


//middleware for parsing req body

app.use(express.json());

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome to DEEPBRAIN');
})

// app.get('/getParadigms', (req, res) => {
//     Paradigm.find()
//     .then(paradigms => res.json(paradigms))
//     .catch(err => res.json(err))
// })

// app.use('/paradigms', paradigmsRoute);

// app.use(express.static('public'));

//middleware for handling CORS policy

app.use(cors());

// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );

//conect DB

mongoose.connect(DATABASE, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(()=> {
    console.log('DB connected');
    //listen to this PORT
    app.listen(PORT, () => {
        console.log(`App is running on port ${PORT}`);
    })
})
.catch((err)=> console.log(err));

// app.get('/getParadigms', (req, res) => {
//     Paradigm.find()
//     .then(paradigms => res.json(paradigms))
//     .catch(err => res.json(err))
// })

app.use('/paradigms', paradigmRouter);
app.use('/animals', animalRouter);
// console.log("is here")
// app.use('/project_directory', directoryRouter)
// Parse JSON bodies

// Define route handler for '/select-folder' POST requests
app.post('/select-folder', (req, res) => {
    const directoryPath = req.body;
    console.log('Received directory path:', directoryPath);
// Process the directory path as needed
    // Here you can perform operations using the directory path

    // Send a response back to the client
    res.json({ message: 'Directory path received successfully' });
});

// const express = require('express');
// const app = express();
// require('dotenv').config();
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const morgan = require('morgan');

// //import routes

// const paradigmRoutes = require('./routes/paradigm');
// const animalRoutes = require('./routes/animal');

// //conect DB

// mongoose.connect(process.env.DATABASE, {
//     useNewUrlParser: true, 
//     useUnifiedTopology: true,
//     useCreateIndex: true
// })
// .then(()=> console.log('DB connected'))
// .catch((err)=> console.log(err));

// //middleware

// app.use(morgan('dev'));
// app.use(bodyParser.json());

// //routes middleware

// app.use("/api", paradigmRoutes);
// app.use("/api", animalRoutes);
// // app.get('/', (req, res)=>{
// //     res.send('Hi Nofar from nodejs');
// // })



// const port = process.env.PORT || 8000;

// app.listen(port, ()=>{
//     console.log(`App is running on port ${port}`);
// })