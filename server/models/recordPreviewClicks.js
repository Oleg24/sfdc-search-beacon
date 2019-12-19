let mongoose = require('mongoose');

const recordPreviewClicksSchema = new mongoose.Schema({
    coordinates: String, // (x,y)
    x: Number, 
    y: Number,
    value: Number,
    windowWidth: Number,
    windowHeight: Number
});

const RecordPreviewClicks = mongoose.model(
    'RecordPreviewClicks', 
    recordPreviewClicksSchema
);

module.exports = RecordPreviewClicks; 