const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;

var tutorialSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    published: {
        type: String,
        default: false
    },
    image :{
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    }
})







    module.exports = mongoose.model('Tutorial', tutorialSchema);