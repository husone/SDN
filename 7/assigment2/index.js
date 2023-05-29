const express = require('express');
const http = require('http');
const parser = require('body-parser');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');

const promoRouter = require('./router/promoRouter');
const leaderRouter = require('./router/leaderRouter');
const connect = mongoose.connect('mongodb://127.0.0.1:27017/conFusion');

connect.then((db) => {
    console.log('Connected correctly to server');
}, (err) => { console.log(err); });

app.use(parser.json());
app.use(morgan('dev'));

const hostname = 'localhost';
const port = 3000;


app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);


const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});