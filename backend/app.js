const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

//import routes

const paradigmRoutes = require('./routes/paradigm');
const animalRoutes = require('./routes/animal');

//conect DB

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(()=> console.log('DB connected'))
.catch((err)=> console.log(err));

//middleware

app.use(morgan('dev'));
app.use(bodyParser.json());

//routes middleware

app.use("/api", paradigmRoutes);
app.use("/api", animalRoutes);
// app.get('/', (req, res)=>{
//     res.send('Hi Nofar from nodejs');
// })



const port = process.env.PORT || 8000;

app.listen(port, ()=>{
    console.log(`App is running on port ${port}`);
})