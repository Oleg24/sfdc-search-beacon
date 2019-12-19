var cluster = require('set-clustering');

function proximity(pointA, pointB){
    var pixelProximity = 5;
    var score = 0;
    if(
        pointA.x <= (pixelProximity + pointB.x) || 
        pointA.x <= (pointB.x - pixelProximity) 
    ) {
        score += 1;
    }
    if(
        pointA.y <= (pixelProximity + pointB.y) || 
        pointA.y <= (pointB.y - pixelProximity) 
    ) {
        score += 1;
    }
    return score;
}

function clusterDataPoints(data){
    var c = cluster(data, proximity)
    return c
}



// function clusterValues(data){
//     // sort the data based on x value
//     data.sort(function(pointA, pointB){
//         return pointA.x < pointB.x;        
//     });  
//     var xClustered = [];   
//     // cluster by x value
//     data.forEach(function(clickData, idx){
//         if(idx != 0){
            
//         }
//     });

//     var clusteredData = [];
//     var clusterSize = 5;
//     // x coordinate: { value, y coordinate}
//     var seenX = {};
//     // y coordinate: { value, x coordinate}
//     var seenY = {};
//     data.forEach(function(point){
//         // point { x, y, value }
//         for(var x in seenX){
//             if(point.x){

//             }
//         }
//     });
// }


module.exports = clusterDataPoints;