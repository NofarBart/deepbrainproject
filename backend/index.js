import express from "express";
import { PORT, DATABASE } from "./config.js";
import mongoose from 'mongoose';
import cors from 'cors';
import paradigmRouter from './routes/paradigmsRoute.js'
import animalRouter from "./routes/animalsRoute.js";
import pythonRouter from "./routes/pythonRoute.js";
import fs from 'fs';
import path from 'path'

const app = express();
let path_temp;

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
app.use('/python', pythonRouter)

// Define route handler for '/select-folder' POST requests
app.post('/select-folder', (req, res) => {
    // console.log(req.body);
    const directoryPath = JSON.parse(req.body.body).name;
    path_temp = directoryPath
    console.log('Received directory path:', directoryPath);
// Process the directory path as needed
    // Here you can perform operations using the directory path

    // Send a response back to the client
    res.json({ message: 'Directory path received successfully' });
});

// Define route handler for '/select-folder' POST requests
app.post('/select-file-in-folder', (req, res) => {
    // console.log(req.body);
    const directoryPath = JSON.parse(req.body.body).name;
    path_temp = directoryPath
    console.log('Received directory path:', directoryPath);
    let fileList = [];
     // Check if there are .h5 files in the directory
    // Read the contents of the directory
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(404).json({ message: 'No directory found.' });
        }

        const videoExtensions = ['.mp4', '.avi', '.mov']; // Add more video file extensions if needed

        // List all files in the directory
        console.log('Files in the directory:');
        files.forEach(file => {
            const { name } = path.parse(file);
            console.log(name);
            // const filePath = path.join(directoryPath, file);
            const extension = file.slice(file.lastIndexOf('.')).toLowerCase();
            if (videoExtensions.includes(extension) && file.includes('resnet50')) {
               fileList.push(file); 
            }
        });
        // console.log(fileList);
        console.log(fileList);
        return res.status(201).send(fileList);
        // return fileList;
    });
// Process the directory path as needed
    // Here you can perform operations using the directory path
    
    // Send a response back to the client
    
    // res.json({ message: 'Directory path received successfully' });
});




