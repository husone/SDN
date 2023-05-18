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


// app.all('/dishes', (req, res, next) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     next();
// });

// app.get('/dishes', (req, res, next) => {
//     res.end('Will send all the dishes to you!');
// });

// app.post('/dishes', (req, res, next) => {
//     res.end('Will add the dish: ' + req.body.name + '`/n' + 
//         ' with details: ' + req.body.description);
// });

// app.put('/dishes', (req, res, next) => {
//     res.statusCode = 403;
//     res.end('PUT operation not supported on /dishes');
// });

// app.delete('/dishes', (req, res, next) => {
//     res.end('Deleting all dishes');
// });

// app.post('/dishes/:dishId', (req, res, next) => {
//     res.statusCode = 403;
//     res.end('POST operation not supported on /dishes/' + req.params.dishId);
// });

// app.put('/dishes/:dishId', (req, res, next) => {
//     res.write('Updating the dish: ' + req.params.dishId + '\n');
//     res.send('Will update the dish: ' + req.body.name +
//         ' with details: ' + req.body.description);
// });

// app.delete('/dishes/:dishId', (req, res, next) => {
//     res.end('Deleting dish: ' + req.params.dishId);
// });

app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);


const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});