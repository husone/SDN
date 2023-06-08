const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
// connect db
const connect = mongoose.connect(process.env.DB_URL + process.env.DB_NAME); 
connect.then((db) => {
    console.log('Connected correctly to server');
}, (err) => { console.log(err); });


const hostname = '127.0.0.1';
const port = 3000;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})
app.use(parser.json());
app.use(morgan('dev'));

app.use("/tutorials", require("./router/TutorialRouter"));

app.route('/')
    .get((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end("Hello World");
    })