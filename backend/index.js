import express from "express";
import { PORT, DATABASE } from "./config.js";
import mongoose from 'mongoose';
import cors from 'cors';
import paradigmRouter from './routes/paradigmsRoute.js'
import animalRouter from "./routes/animalsRoute.js";
import { spawn } from 'child_process';
import fs from 'fs';
// Use dynamic import to load tree-kill
import kill from 'tree-kill';

const app = express();
let path;
let pythonProcess;
let isProcessing = false; // Variable to track request processing state

//middleware for parsing req body

app.use(express.json());

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome to DEEPBRAIN');
})

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

app.use('/paradigms', paradigmRouter);
app.use('/animals', animalRouter);

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
        if (isProcessing) {
            // Return an error response indicating that a request is already in progress
            if (pythonProcess) {
                // where the killing happens
                kill(pythonProcess.pid);
            //     return res.status(200).json({ message: 'A request is already being processed.' });
            // } else {
            //     return res.status(404).json({ message: 'No child process running.' });
            }
        }

        console.log("entered python script command")
        const config = JSON.parse(req.body.body).config;
        console.log("config is: ", config)
        const path = JSON.parse(req.body.body).videos;
        console.log("path is: ", path)
        const pythonScriptPath = 'deeplabcut/complete_network_code.py';

        let files;
        const videoExtensions = ['.mp4', '.avi', '.mov']; // Add more video file extensions if needed
        // Read the contents of the directory synchronously
        if (fs.existsSync(path)) {
            files = fs.readdirSync(path)
        }
        else {
            console.log("no such dir")
            return res.status(404).json({ message: 'No directory found.' });
        }

        // Check if any of the files have a video file extension
        const hasVideo = files.some((file) => {
        const extension = file.slice(file.lastIndexOf('.')).toLowerCase();
            return videoExtensions.includes(extension);
        });

        if (hasVideo) {
            console.log('Video file exists in the directory.');
        } else {
            console.log('No video file found in the directory.');
            return res.status(404).json({ message: 'No videos found.' });
        }

        // Set the processing flag to true to indicate that a request is now being processed
        isProcessing = true;

        // Execute the command using spawn
        pythonProcess = spawn('python', [pythonScriptPath, config, path], { shell: true, stdio: 'pipe' });
            
        pythonProcess.stdout.on('data', (data) => {
            console.log('Python script output:', data.toString());
        });
    
        pythonProcess.stderr.on('data', (data) => {
            console.error('Python script error:', data.toString());
        });
    
        // Handle process exit
        pythonProcess.on('exit', (exitCode) => {
            console.log(`Python script exited with code ${exitCode}`);
            isProcessing = false; // Reset the processing flag once processing is completed
            // res.json({ output, error, exitCode: code }); // Send the output, error, and exit code
            res.json({ exitCode }); // Send the exit code
        });
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




