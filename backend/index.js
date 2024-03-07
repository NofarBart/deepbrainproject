import express from "express";
import { PORT, DATABASE } from "./config.js";
import mongoose from 'mongoose';
import cors from 'cors';
import paradigmRouter from './routes/paradigmsRoute.js'
import animalRouter from "./routes/animalsRoute.js";
// import directoryRouter from "./routes/directoryRoute.js";

import { Paradigm } from "./models/paradigm.js"
import { spawn } from 'child_process';
// const { spawn } = require('child_process');
const app = express();
let path;

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
    // console.log(req.body);
    const directoryPath = JSON.parse(req.body.body).name;
    path = directoryPath
    console.log('Received directory path:', directoryPath);
// Process the directory path as needed
    // Here you can perform operations using the directory path

    // Send a response back to the client
    res.json({ message: 'Directory path received successfully' });
});

app.post('/run-python-script', (req, res) => {
    // Extract parameters from the request body
    // const { parameter2 } = req.body;
    const config = JSON.parse(req.body.body).config;
    const path = JSON.parse(req.body.body).videos;
    // Path to your Python script
    const pythonScriptPath = 'complete_network_code.py';
    const spawnOptions = {
        // , TF_CPP_MIN_LOG_LEVEL: '2'
        env: { ...process.env }, // Set TensorFlow log level
        // cwd: '/path/to/working/directory', // Set working directory
        stdio: 'inherit', // Inherit input/output streams
        // timeout: 60000, // Set timeout to 60 seconds
    };
    console.log("entered python script req")
    // Spawn a child process to execute the Python script with parameters
    const pythonProcess = spawn('python', [pythonScriptPath, config, path], spawnOptions);
    
    // Handle standard output data from the Python script
    // pythonProcess.stdout.on("data", (data) => {
    //     // console.log(`Python script output: ${data}`);
    //     res.write(data);
    //     // You can send data back to the client if needed
    // });
        

    // let totalFrames = 0;
    // let currentFrame = 0;

    // pythonProcess.stdout.on('data', data => {
    //     const output = data.toString();
    //     console.log(output)
    //     const match = output.match(/(\d+)\/(\d+)/); // Match the current frame and total frames

    //     if (match) {
    //         currentFrame = parseInt(match[1]);
    //         totalFrames = parseInt(match[2]);
    //         const percentage = (currentFrame / totalFrames) * 100;
    //         res.send(percentage.toString());
    //     }
    // });

    // pythonProcess.stderr.on('data', data => {
    //     console.error(`stderr: ${data}`);
    // });
    // Handle errors that occur during execution
    pythonProcess.on('error', (err) => {
        console.error('Error executing Python script:', err);
        // Send an error response back to the client
        res.status(500).json({ error: 'Failed to execute Python script' });
    });

    // Handle process exit
    pythonProcess.on('exit', (code) => {
        console.log(`Python script exited with code ${code}`);
        // Optionally, send a success response back to the client
        res.json({ message: 'Python script executed successfully' });
    });
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