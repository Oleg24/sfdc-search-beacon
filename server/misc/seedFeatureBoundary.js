let FeatureBoundary = require('../models/featureBoundary');

function seedFeatureBoundary(){
    const featureBoundaryData = [{
        featureName: 'recordPreview',
        topLeftX: 581,
        topLeftY: 50,
        topRightX: 980,
        topRightY: 50,
        bottomLeftX: 585,
        bottomLeftY: 555,
        bottomRightX: 980,
        bottomRightY: 555 
    }, {
        featureName: 'searchSuggestions',
        topLeftX: 180,
        topLeftY: 50,
        topRightX: 580,
        topRightY: 50,
        bottomLeftX: 180,
        bottomLeftY: 555,
        bottomRightX: 580,
        bottomRightY: 555
    }, {
        featureName: 'leftNav',
        topLeftX: 0,
        topLeftY: 92,
        topRightX: 240,
        topRightY: 92,
        bottomLeftX: 0,
        bottomLeftY: 790,
        bottomRightX: 240,
        bottomRightY: 790
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