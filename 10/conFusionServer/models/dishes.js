const moongoose = require('mongoose');
require('mongoose-currency').loadType(moongoose);
const Currency = moongoose.Types.Currency;
const Schema = moongoose.Schema;

const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
},
    {
        timestamps: true
    }
);

const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    label:{
        type: String,
        default: ''
    },
    price :{
        type: Currency,
        required: true,
        min: 0
    },
    featured:{
        type: Boolean,
        default: false
    },
    comments: [commentSchema]
},{
    timestamps: true
});

var Dishes = moongoose.model('Dish', dishSchema);
module.exports = Dishes;
