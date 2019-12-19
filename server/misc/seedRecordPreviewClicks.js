let RecordPreviewClicks = require('../models/recordPreviewClicks');

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

function generateRandomCoordinate(){
   return {
       x: getRandomInt(500),
       y: getRandomInt(500)
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
            value: getRandomInt(50)
        }
        recordPreviewClicksData.push(clickPoint);
    }

    for(recordPreviewClickPoint of recordPreviewClicksData){
        let clickData = new RecordPreviewClicks(recordPreviewClickPoint);
        clickData.save((err) => {
            if(err){ 
                console.log('Error', err);
            } else {
                console.log('record preview point ssaved!');
            }
        });
    }
}

module.exports = seedRecordPreviewClicks;