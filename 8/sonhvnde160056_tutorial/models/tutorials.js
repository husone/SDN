const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const DetailSchema = new Schema({
    Publisher: {
        type: String,
        required: true
    },
    Publication_Year: {
        type: Number,
        required: true
    },
    "ISBN-13": {
        type: Number,
        required: true,
        unique : true
    },
    Language: {
        type: String,
        required: true
    },
    Pages: {
        type: Number,
        required: true
    }
},
    {
        timestamps: true
    }
);

const PriceSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    price: {
        type: Currency,
        default : 0,
        required: true
    }
},
    {
        timestamps : true
    }
)

const TutorialSchema = new Schema({
    Title: {
        type: String,
        required: true
    },
    Author: {
        type: String,
        required: true
    },
    Detail: DetailSchema,
    Price: [PriceSchema]
});

const Tutorial = mongoose.model('tutorial', TutorialSchema);
module.exports = Tutorial;
