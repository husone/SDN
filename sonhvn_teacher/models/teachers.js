const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;

var teacherSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    Dob: {
        type: String,
    },
    address: {
        type: String
    },
    image: {
        type: String,
        default: ''
    },
    salary: {
        type: Currency,
        required: true,
        min: 0
    }
})


module.exports = mongoose.model('Teacher', teacherSchema);