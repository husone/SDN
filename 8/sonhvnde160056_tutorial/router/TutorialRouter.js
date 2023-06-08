const express = require('express');
const bodyParser = require('body-parser');
const tutorialRouter = express.Router();

const Tutorials = require('../models/tutorials');

tutorialRouter.use(bodyParser.json());

tutorialRouter.route('/')
    .get((req, res, next) => {
        Tutorials.find({})
            .then((tutorials) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(tutorials);
            }
                , (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Tutorials.create(req.body)
            .then((tutorial) => {
                console.log('Tutorial Created ', tutorial);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(tutorial);
            }
                , (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /tutorials');
    })
    .delete((req, res, next) => {
        Tutorials.deleteMany({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            },
                (err) => next(err))
            .catch((err) => next(err));
    })
tutorialRouter.route('/:tutorialId')
    .get((req, res, next) => {
        Tutorials.findById(req.params.tutorialId)
            .then((tutorial) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(tutorial);
            },
                (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /tutorials/' + req.params.tutorialId);
    }
    )
    .put((req, res, next) => {
        Tutorials.findByIdAndUpdate(req.params.tutorialId, { $set: req.body }, { new: true })
            .then((tutorial) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(tutorial);
            }
                , (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Tutorials.findByIdAndDelete(req.params.tutorialId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }
                , (err) => next(err))
            .catch((err) => next(err));
    });



module.exports = tutorialRouter;