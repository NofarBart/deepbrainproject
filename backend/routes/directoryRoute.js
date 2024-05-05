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

// Define route handler for '/select-folder' POST requests
directoryRouter.post('/delete-photos', (req, res) => {
    // console.log(req.body);
    // Read the contents of the directory
    
    fs.rm("../frontend/public/output1.jpg", function (err) {
        if (err) {
            return res.status(404).json({ message: 'No photo found.' });
        }
    });

    fs.rm("../frontend/public/output2.jpg", function (err) {
        if (err) {
            return res.status(404).json({ message: 'No photo found.' });
        }
    });

    fs.rm("../frontend/public/output3.jpg", function (err) {
        if (err) {
            return res.status(404).json({ message: 'No photo found.' });
        }
    });
});

// Define route handler for '/select-folder' POST requests
directoryRouter.post('/download-photo', (req, res) => {
    // console.log(req.body);
    // Read the contents of the directory
    const name = JSON.parse(req.body.body).name;
    const tab = JSON.parse(req.body.body).tab;
    // Specify the path to the locally stored image
    const sourceFilePath = '../frontend/src/images/output' + tab + '.jpg'; // Replace with the actual source file path
    const destinationDir = JSON.parse(req.body.body).path;// Destination directory where you want to move or copy the images
    // Read the image file
    fs.readFile(sourceFilePath, (err, data) => {
        if (err) {
        console.error('Error reading file:', err);
        return;
        }
    
        // Write the image file to the target directory
        const targetFilePath = path.join(destinationDir, name);
        fs.writeFile(targetFilePath, data, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
    
        console.log('Image saved successfully to', targetFilePath);
        });
//     // Read the files in the source directory
//     fs.readdir(sourceDir, (err, files) => {
//     if (err) {
//         console.error('Error reading directory:', err);
//         return;
//     }

//   // Loop through each file in the source directory
//   files.forEach(file => {
//     const sourceFile = path.join(sourceDir, file);
//     const destinationFile = path.join(destinationDir, file);

//     // Move or copy the file to the destination directory
//     fs.copyFile(sourceFile, destinationFile, (err) => {
//       if (err) {
//         console.error('Error copying file:', err);
//       } else {
//         console.log(`File ${file} copied successfully to ${destinationDir}`);
//         // Delete the file from the source directory after successful copy
//         fs.unlink(sourceFile, (err) => {
//           if (err) {
//             console.error('Error deleting file:', err);
//           } else {
//             console.log(`File ${file} deleted from ${sourceDir}`);
//           }
//         });
//       }
//     });
//   });
    });
});
export default directoryRouter;
