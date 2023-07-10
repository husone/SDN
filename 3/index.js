const express = require('express');
const http = require('http');
const parser = require('body-parser');
const morgan = require('morgan');
const app = express();
const dishRouter = require('./router/dishesRouter');
const promoRouter = require('./router/promoRouter');
const leaderRouter = require('./router/leaderRouter');

app.use(parser.json());
app.use(morgan('dev'));

const hostname = 'localhost';
const port = 3000;

app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);


const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});