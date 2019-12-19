let RecordPreviewClicks = require('../models/recordPreviewClicks');
let SearchSuggestionClicks = require('../models/searchSuggestionClicks');
let LeftNavClicks = require('../models/leftNavClicks');
let FeatureBoundary = require('../models/featureBoundary');
let helpers = require('../helpers/helpers');

const regionCollectionMap = {
    'recordPreview': RecordPreviewClicks,
    'searchSuggestions': SearchSuggestionClicks,
    'leftNav': LeftNavClicks
};

function getClickHeatMapData(req, res){
    const region = req.params.region;
    const collection = regionCollectionMap[region];
    if(!collection){
        res.status(404);
        res.send("no heat map for this region")
    } else {
        collection.find({}, function(err, clickData){
            FeatureBoundary.find({ featureName: region }, 'topLeftX topLeftY', function(err, boundaries){
                var normalizedData = helpers.normalizeData(clickData, boundaries[0]);
                var clusteredData = helpers.clusterValues(normalizedData);
                res.send(clusteredData);
            });
            
        });
    }
}

module.exports = getClickHeatMapData;