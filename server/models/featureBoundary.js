let mongoose = require('mongoose');

const featureBoundarySchema = new mongoose.Schema({
    featureName: {
        type: String, 
        unique: true
    },
    topLeftX: {
        type: Number
    },
    topLeftY: {
        type: Number
    },
    topRightX: {
        type: Number
    },
    topRightY: {
        type: Number
    },
    bottomLeftX: {
        type: Number
    },
    bottomLeftY: {
        type: Number
    },
    bottomRightX: {
        type: Number
    },
    bottomLeftY: {
        type: Number
    }
});

const FeatureBoundary = mongoose.model('FeatureBoundary', featureBoundarySchema);

module.exports = FeatureBoundary; 