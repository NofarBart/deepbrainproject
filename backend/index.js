import express from "express";
import { PORT, DATABASE } from "./config.js";
import mongoose from 'mongoose';
import cors from 'cors';
import paradigmsRoute from './routes/paradigmsRoute.js'

const app = express();

//middleware for parsing req body

app.use(express.json());

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome to DEEPBRAIN');
})

app.use('/paradigms', paradigmsRoute);

//middleware for handling CORS policy

app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

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