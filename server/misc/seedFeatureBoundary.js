let FeatureBoundary = require('../models/featureBoundary');

function seedFeatureBoundary(){
    const featureBoundaryData = [{
        featureName: 'recordPreview',
        topLeftX: 580,
        topLeftY: 105,
        topRightX: 980,
        topRightY: 105,
        bottomLeftX: 580,
        bottomLeftY: 1190,
        bottomRightX: 980,
        bottomRightY: 1190 
    }];

    for(featureData of featureBoundaryData){
        let feature = new FeatureBoundary(featureData);
        feature.save((err) => {
            if(err){ 
                console.log('Error', err);
            } else {
                console.log('boundary saved!');
            }
        });
    }
}

module.exports = seedFeatureBoundary;