let mongoose = require('mongoose');

const searchSuggestionClicksSchema = new mongoose.Schema({
    coordinates: String, // (x,y)
    x: Number, 
    y: Number,
    value: Number,
    windowWidth: Number,
    windowHeight: Number
});

const SearchSuggestionClicks = mongoose.model(
    'SearchSuggestionClicks', 
    searchSuggestionClicksSchema
);

module.exports = SearchSuggestionClicks; 