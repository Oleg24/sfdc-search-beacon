let mongoose = require('mongoose');

const searchSuggestionClicksSchema = new mongoose.Schema({
    featureName: String,
    value: Number
});

const SearchSuggestionClicks = mongoose.model(
    'SearchSuggestionClicks', 
    searchSuggestionClicksSchema
);

module.exports = SearchSuggestionClicks; 