const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Teacher = require('../models/teachers');
const teacherRouter = express.Router();
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

teacherRouter.use(bodyParser.json());
teacherRouter.route('/')
    .get((req, res, next) => {
        Teacher.find({})
            .then((teachers) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(teachers);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, upload.single('image'), (req, res, next) => {
        req.body.image = req.file.path;
        Teacher.create(req.body)
            .then((teacher) => {
                console.log('Teacher Created ', teacher);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(teacher);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /teachers');
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Teacher.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);

            }, (err) => next(err))
            .catch((err) => next(err));
    })

teacherRouter.route('/:teacherId')
    .get(authenticate.verifyUser, (req, res, next) => {
        Teacher.findById(req.params.teacherId)
            .then((teacher) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(teacher);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /teachers/' + req.params.teacherId);
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, upload.single('image'), (req, res, next) => {
        if (req.file) {
            req.body.image = req.file.path;
        }
        console.log(req.body)
        Teacher.findById(req.params.teacherId, {
            $set: req.body
        }, { new: true })
            .then((teacher) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(teacher);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Teacher.findByIdAndRemove(req.params.teacherId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);

            }, (err) => next(err))
            .catch((err) => next(err));
    })

module.exports = teacherRouter;