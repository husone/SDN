const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: [18]
    }
});

const Student = mongoose.model('student', StudentSchema);
module.exports = Student;
