import express from 'express';
import fs from 'fs';
import path from 'path'
const directoryRouter = express.Router();

// Define route handler for '/select-folder' POST requests
directoryRouter.post('/select-folder', (req, res) => {
    // console.log(req.body);
    const directoryPath = JSON.parse(req.body.body).name;
    console.log('Received directory path:', directoryPath);
// Process the directory path as needed
    // Here you can perform operations using the directory path

    // Send a response back to the client
    res.json({ message: 'Directory path received successfully' });
});



// Define route handler for '/select-folder' POST requests
directoryRouter.post('/select-file-in-folder', (req, res) => {
    // console.log(req.body);
    const directoryPath = JSON.parse(req.body.body).name;
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

// Define route handler for '/select-folder' POST requests
directoryRouter.post('/sessions', (req, res) => {
    // console.log(req.body);
    const directoryPath = JSON.parse(req.body.body).name;
    console.log('Received directory path:', directoryPath);
     // Read the contents of the directory
     fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(404).json({ message: 'No directory found.' });
        }

        let fileList = [];

        // Iterate through each item in the directory
        files.forEach(item => {
            const itemPath = path.join(directoryPath, item);

            // Check if the item is a directory using fs.stat
            fs.stat(itemPath, (err, stats) => {
                if (err) {
                    console.error(err);
                    return;
                }

                if (stats.isDirectory()) {
                    fileList.push(item); // Add directory to the fileList array
                }

                // Check if this is the last item in the directory
                if (fileList.length === files.length) {
                    console.log('List of directories:', fileList);
                    return res.status(201).send(fileList);
                }
            });
        });
    });
});
export default directoryRouter;