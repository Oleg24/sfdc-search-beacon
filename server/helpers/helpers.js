// normalize respective to 0, 0
function normalizeData(data, boundaries){
    return data.map(function(point){
        // point - { x, y, value, windowWidth, windowHeight }
        var normalizedPoint = Object.assign(point, {
            x: point.x - boundaries.topLeftX,
            y: point.y - boundaries.topLeftY,
        });
        return normalizedPoint;
    });
}

function clusterValues(data, pixelProximity){
    pixelProximity = pixelProximity || 2;
    
    // sort in ascending value based on x 
    data = data.sort(function(pointA, pointB){
        return pointA.x - pointB.x;        
    });  

    // cluster by x value
    var xClustered = [];   
    var clusterCount = 0;
    data.forEach(function(point, idx){
        var clustered = false;
        if(idx != 0){
            var previousPoint = xClustered[idx - 1 - clusterCount];
            if((point.x - previousPoint.x) < pixelProximity){
                // if the previous point is within the pixel proximity
                // combine their values 
                clustered = true;
                clusterCount += 1;
                previousPoint.value += point.value;
            } 
        }

        if(!clustered){
            // else just push to cluster
            xClustered.push(point);
        }
    });

    // sort in ascending value based on y 
    xClustered = xClustered.sort(function(pointA, pointB){
        return pointA.y - pointB.y;        
    });  

    var yClustered = []; 
    // reset cluster count
    clusterCount = 0;  
    // cluster by y value
    xClustered.forEach(function(point, idx){
        var clustered = false;
        if(idx != 0){
            var previousPoint = xClustered[idx - 1 - clusterCount];
            if((point.y - previousPoint.y) < pixelProximity){
                // if the previous point is within the pixel proximity
                // combine their values 
                clustered = true;
                clusterCount += 1;
                previousPoint.value += point.value;
            }
        }
        if(!clustered){
            // else just push to cluster
            yClustered.push(point);
        }
    });

    // return x y clustered points
    return yClustered;
}

module.exports = {
    normalizeData,
    clusterValues
};