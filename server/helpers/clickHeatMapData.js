let mongoose = require('mongodb');
let appConstants = require('../constants');
let RecordPreviewClicks = require('../models/recordPreviewClicks');

const regionCollectionMap = {
    'recordPreview': RecordPreviewClicks
};

function getClickHeatMapData(req, res){
    const region = req.params.region;
    const collection = regionCollectionMap[region];
    console.log(collection)
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