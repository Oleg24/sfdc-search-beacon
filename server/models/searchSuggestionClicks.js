let mongoose = require('mongoose');

const searchSuggestionClicksSchema = new mongoose.Schema({
    featureName: String,
    value: Number
});

const SearchSuggestionClicks = mongoose.Model(
    'searchSuggestionClicks', 
    searchSuggestionClicksSchema
);

module.exports = SearchSuggestionClicks; 