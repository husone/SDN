const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Tutorial = require('../models/tutorials');
const tutorialRouter = express.Router();
var authenticate = require('../authenticate');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter });

tutorialRouter.use(bodyParser.json());
tutorialRouter.route('/')
    .get((req, res, next) => {
        Tutorial.find({})
            .then((tutorials) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(tutorials);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, upload.single('image'), (req, res, next) => {
        req.body.image = req.file.path;
        Tutorial.create(req.body)
            .then((tutorial) => {
                console.log('Tutorial Created ', tutorial);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(tutorial);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /tutorials');
    })
    .delete(authenticate.verifyAdmin, (req, res, next) => {
        Tutorial.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);

            }, (err) => next(err))
            .catch((err) => next(err));
    })

tutorialRouter.route('/:tutorialId')
    .get(authenticate.verifyUser, (req, res, next) => {
        Tutorial.findById(req.params.tutorialId)
            .then((tutorial) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(tutorial);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;   
        res.end('POST operation not supported on /tutorials/' + req.params.tutorialId);
    })
    .put(authenticate.verifyUser, upload.single('image'), (req, res, next) => {
        if (req.file) {
            req.body.image = req.file.path;
        }
        console.log(req.body)
        Tutorial.findById(req.params.tutorialId, {
            $set: req.body
        }, { new: true })
            .then((tutorial) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(tutorial);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Tutorial.findByIdAndRemove(req.params.tutorialId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);

            }, (err) => next(err))
            .catch((err) => next(err));
    })

module.exports = tutorialRouter;