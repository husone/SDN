const express = require('express');
const bodyParser = require('body-parser');
const leaderRouter = express.Router();
var authenticate = require('../authenticate');

leaderRouter.use(bodyParser.json());

leaderRouter.route('/:leaderId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'text/plain');
        next();
    }
    )
    .get((req, res, next) => {
        res.end('Will send details of the leader: ' + req.params.leaderId + ' to you!');
    }
    )
    .post(authenticate.verifyUser,(req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /leaders/' + req.params.leaderId);
    }
    )
    .put(authenticate.verifyUser,(req, res, next) => {
        res.write('Updating the leader: ' + req.params.leaderId + '\n');
        res.end('Will update the leader: ' + req.body.name + ' with details: ' + req.body.description);
    }
    )
    .delete(authenticate.verifyUser,(req, res, next) => {
        res.end('Deleting leader: ' + req.params.leaderId);
    }
    );

module.exports = leaderRouter;