let RecordPreviewClicks = require('../models/recordPreviewClicks');
let SearchSuggestionClicks = require('../models/searchSuggestionClicks');

const regionCollectionMap = {
    'recordPreview': RecordPreviewClicks,
    'searchSuggestions': SearchSuggestionClicks
};

function getClickHeatMapData(req, res){
    const region = req.params.region;
    const collection = regionCollectionMap[region];
    if(!collection){
        res.status(404);
        res.send("no heat map for this region")
    } else {
        collection.find({}, function(err, clickData){
            res.send(clickData);
        });
    }
}

module.exports = getClickHeatMapData;