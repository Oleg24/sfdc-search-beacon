let RecordPreviewClicks = require('../models/recordPreviewClicks');
let SearchSuggestionClicks = require('../models/searchSuggestionClicks');
let LeftNavClicks = require('../models/leftNavClicks');

let typeModelMap = {
    recordPreview: RecordPreviewClicks,
    searchSuggestions: SearchSuggestionClicks,
    leftNav: LeftNavClicks
}

let dimensionsMap = {
    recordPreview: {
        minX: 585,
        maxX: 980,
        minY: 50,
        maxY: 555
    }, 
    searchSuggestions: {
        minX: 180,
        maxX: 585,
        minY: 50,
        maxY: 555
    },
    leftNav: {
        minX: 0,
        maxX: 240,
        minY: 92,
        maxY: 790
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomCoordinate(type){
    let dimensions = dimensionsMap[type];
    console.log(dimensions);
    return {
       x: getRandomInt(dimensions.minX, dimensions.maxX),
       y: getRandomInt(dimensions.minY, dimensions.maxY)
   }
}

function seedClicksByType(type){
    let clicksData = [];

    for(var i = 0; i < 50; i++){
        let {x, y} = generateRandomCoordinate(type);
        var clickPoint = {
            coordinate: "(" + x + "," + y +")",
            x: x,
            y: y,
            value: getRandomInt(1, 50),
            windowWidth: 1440,
            windowHeight: 798
        }
        clicksData.push(clickPoint);
    }

    for(dataPoint of clicksData){
        let Model = typeModelMap[type];
        let clickData = new Model(dataPoint);
        clickData.save((err) => {
            if(err){ 
                console.log('Error', err);
            } else {
                console.log('data seeded for' + type);
            }
        });
    }
}

module.exports = seedClicksByType;