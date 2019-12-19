let mongoose = require('mongoose');

const leftNavClicksSchema = new mongoose.Schema({
    coordinates: String, // (x,y)
    x: Number, 
    y: Number,
    value: Number,
    windowWidth: Number,
    windowHeight: Number
});

const LeftNavClicks = mongoose.model(
    'LeftNavClicks', 
    leftNavClicksSchema
);

module.exports = LeftNavClicks; 