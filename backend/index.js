import express from "express";
import { PORT, DATABASE } from "./config.js";
import mongoose from 'mongoose';
import cors from 'cors';
import paradigmRouter from './routes/paradigmsRoute.js'
import animalRouter from "./routes/animalsRoute.js";
// import directoryRouter from "./routes/directoryRoute.js";
import { Paradigm } from "./models/paradigm.js"
import { spawn } from 'child_process';
import { exec } from 'child_process'; // Import exec function from child_process module
import { exit } from "process";
import os from 'os';

// Use dynamic import to load tree-kill
import kill from 'tree-kill';
// const kill = import('tree-kill');
// const { spawn } = require('child_process');
const app = express();
let path;
let pythonProcess;

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
        console.log("entered python script command")
        const config = JSON.parse(req.body.body).config;
        console.log("config is: ", config)
        const path = JSON.parse(req.body.body).videos;
        console.log("path is: ", path)
        const pythonScriptPath = 'complete_network_code.py';
    
        // Construct the command to execute the Python script with parameters
        const command = `python ${pythonScriptPath} ${config} ${path}`;

        // Execute the command using spawn
        pythonProcess = spawn('python', [pythonScriptPath, config, path], { shell: true, stdio: 'pipe' });

        // Check if the request includes a cancellation token
        
        // Collect stdout and stderr data
        let output = '';
        let error = '';

        // res.setHeader('Content-Type', 'text/event-stream');
        // res.setHeader('Cache-Control', 'no-cache');
        // res.setHeader('Connection', 'keep-alive');

        // // Send initial response
        // res.write('data: Initial response\n\n');
            
        pythonProcess.stdout.on('data', (data) => {
            console.log('Python script output:', data.toString());
            output += data.toString();
            // res.write(data); // Stream stderr data to the response
        });
    
        pythonProcess.stderr.on('data', (data) => {
            console.error('Python script error:', data.toString());
            error += data.toString();
            // res.write(error);
            // res.json({ output, error }); // Send the output, error, and exit code
            // res.write(JSON.stringify(data.toString())); // Stream stderr data to the response
        });
    
        // Handle process exit
        pythonProcess.on('exit', (code) => {
            console.log(`Python script exited with code ${code}`);
            res.json({ output, error, exitCode: code }); // Send the output, error, and exit code
        });
        // Handle process exit
        // pythonProcess.on('exit', (code) => {
        //     console.log(`Python script exited with code ${code}`);
        //     res.end(); // End the response when the script finishes
        // });
    });

    // Endpoint to stop the child process
    app.post('/stop-process', (req, res) => {
        if (pythonProcess) {
            // where the killing happens
            kill(pythonProcess.pid);
            res.status(200).json({ message: 'Child process stopped successfully.' });
        } else {
        res.status(404).json({ message: 'No child process running.' });
        }
    });




