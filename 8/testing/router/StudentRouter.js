const express = require('express');
const bodyParser = require('body-parser');
const studentRouter = express.Router();

const Students = require('../models/students');

studentRouter.use(bodyParser.json());

studentRouter.route('/')
    .get((req, res, next) => {
        Students.find({})
            .then((students) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(students);
            }
                , (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Students.create(req.body)
            .then((student) => {
                console.log('Student Created ', student);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(student);
            }
                , (err) => next(err))
            .catch((err) => next(err));
    })

module.exports = studentRouter;