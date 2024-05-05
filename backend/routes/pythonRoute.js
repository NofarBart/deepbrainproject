import express from 'express';
import { spawn } from 'child_process';
import fs from 'fs';
// Use dynamic import to load tree-kill
import kill from 'tree-kill';
const pythonRouter = express.Router();

let pythonProcess;
let isProcessing = false; // Variable to track request processing state
//route for create csv file

pythonRouter.post('/run-python-script', (req, res) => {
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

pythonRouter.post('/create-csv', (req, res) => {
    let output = ''; // Initialize the output variable
    if (isProcessing) {
        // Return an error response indicating that a request is already in progress
        if (pythonProcess) {
            kill(pythonProcess.pid);
        }
        return res.status(200).json({ message: 'A request is already being processed.' });
    }

    const newPath = JSON.parse(req.body.body).save;
    const h5Directory = JSON.parse(req.body.body).name;
    const pythonScriptPath = 'deeplabcut/csv_files.py';
    
    // Check if there are .h5 files in the directory
    fs.readdir(h5Directory, (err, files) => {
        if (err) {
            isProcessing = false;
            return res.status(404).json({ message: 'No directory found.' });
        }

        // Check if there are any files with .h5 extension
        const hasH5Files = files.some(file => file.toLowerCase().endsWith('.h5'));

        if (!hasH5Files) {
            isProcessing = false;
            return res.status(404).json({ message: 'No analyzed videos found.' });
        }

        // Set the processing flag to true to indicate that a request is now being processed
        isProcessing = true;

        // Execute the command using spawn
        pythonProcess = spawn('python', [pythonScriptPath, h5Directory, newPath]);

        pythonProcess.stdout.on('data', (data) => {
            output += data.toString();
            console.log('Python script output:', data.toString());
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error('Python script error:', data.toString());
        });

        // Handle process exit
        pythonProcess.on('exit', (exitCode) => {
            console.log(`Python script exited with code ${exitCode}`);
            isProcessing = false;
            return res.json({ output, exitCode }); // Send the exit code
        });
    });
});

// Function to extract body parts from the output string
function extractBodyParts(output) {
    const startIndex = output.indexOf("[");
    const endIndex = output.indexOf("]");
    if (startIndex !== -1 && endIndex !== -1) {
        const body_parts_str = output.substring(startIndex + 1, endIndex); // Exclude the square brackets
        const body_parts_list = body_parts_str.split(", "); // Split by comma and space
        const trimmed_body_parts = body_parts_list.map(part => part.replace(/'/g, '')); // Remove single quotes
        return trimmed_body_parts;
    } else {
        console.error("Body parts not found in output:", output);
        return [];
    }
}

pythonRouter.post('/select-body-part', (req, res) => {
    let output = ''; // Initialize the output variable
    // console.log(req.body);
    const configPath = JSON.parse(req.body.body).name;
    console.log('Received config path:', configPath);
    const pythonScriptPath = 'deeplabcut/body_parts.py';
// Process the directory path as needed
    // Here you can perform operations using the directory path
     // Execute the command using spawn
     pythonProcess = spawn('python', [pythonScriptPath, configPath], { shell: true, stdio: 'pipe' });

    // Capture stdout data from the Python process
    pythonProcess.stdout.on('data', (data) => {
        output += data.toString(); // Append stdout data to the output string
    });

    // Handle process exit
    pythonProcess.on('exit', (exitCode) => {
        console.log(`Python script exited with code ${exitCode}`);
        const body_parts = extractBodyParts(output); // Extract body parts from the output
        return res.json({ body_parts }); // Send the extracted body parts as the response
    });
});


pythonRouter.post('/create-plots', (req, res) => {
    if (isProcessing) {
        // Return an error response indicating that a request is already in progress
        if (pythonProcess) {
            kill(pythonProcess.pid);
        }
        return res.status(200).json({ message: 'A request is already being processed.' });
    }

    const h5File = JSON.parse(req.body.body).name;
    const bodyPart = JSON.parse(req.body.body).bpt;
    const graphs = JSON.parse(req.body.body).graphs;
    const graph_title = JSON.parse(req.body.body).title;
    const pythonScriptPath = 'deeplabcut/analyze.py';
    
    if (!fs.existsSync(h5File)) {
        isProcessing = false;
        return res.status(404).json({ message: 'No h5 file found.' });
    }
        // Set the processing flag to true to indicate that a request is now being processed
        isProcessing = true;

        // Execute the command using spawn
        pythonProcess = spawn('python', [pythonScriptPath, h5File, bodyPart, graphs, graph_title], { shell: true, stdio: 'pipe' });

        pythonProcess.stdout.on('data', (data) => {
            console.log('Python script output:', data.toString());
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error('Python script error:', data.toString());
        });

        // Handle process exit
        pythonProcess.on('exit', (exitCode) => {
            console.log(`Python script exited ${exitCode}`);
            isProcessing = false;
            return res.json({ exitCode }); // Send the exit code
        });
    });



// Endpoint to stop the child process
pythonRouter.post('/stop-process', (req, res) => {
    if (pythonProcess) {
        // where the killing happens
        kill(pythonProcess.pid);
        res.status(200).json({ message: 'Child process stopped successfully.' });
    } else {
    res.status(404).json({ message: 'No child process running.' });
    }
});


export default pythonRouter;