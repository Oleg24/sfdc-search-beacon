let RecordPreviewClicks = require('../models/recordPreviewClicks');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomCoordinate(){
   return {
       x: getRandomInt(585, 980),
       y: getRandomInt(50, 555)
   }
}

function seedRecordPreviewClicks(){
    let recordPreviewClicksData = [];

    for(var i = 0; i < 50; i++){
        let {x, y} = generateRandomCoordinate();
        var clickPoint = {
            coordinate: "(" + x + "," + y +")",
            x: x,
            y: y,
            value: getRandomInt(1, 50),
            windowWidth: 1440,
            windowHeight: 798
        }
        recordPreviewClicksData.push(clickPoint);
    }

    for(recordPreviewClickPoint of recordPreviewClicksData){
        let clickData = new RecordPreviewClicks(recordPreviewClickPoint);
        clickData.save((err) => {
            if(err){ 
                console.log('Error', err);
            } else {
                console.log('record preview point saved!');
            }
        });
    }
}

module.exports = seedRecordPreviewClicks;