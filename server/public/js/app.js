(function(){
    var currentRegion = null;
    var constants = {
        apiUrl: '/api/heatMap/',
        navigationRegions: [{
            name: 'about',
            label: 'About',
            image: null
        }, {
            apiName: 'recordPreview',
            label: 'Record Preview',
            image: 'recordPreview.png' 
        }, {
            apiName: 'searchSuggestions',
            label: 'Instant Results',
            image: 'searchSuggestions.png'
        }, {
            apiName: 'leftNav',
            label: 'Left Navigation',
            image: 'leftNav.png'
        }]
    };

    function init(){
        createNavigationList();
    }
    
    function fetchClickData(regionForHeatMap, callback){
        var apiUrl = constants.apiUrl + regionForHeatMap;
        $.get(apiUrl, function(data){
            console.log('we have data', data);
            callback(regionForHeatMap, data);
        });
    };

    function renderHeatMap(apiData){
        var heatmapInstance = h337.create({
            container: document.getElementById("heatmapContainer"),
            radius: 100,
            maxOpacity: .5
        });

        // sort data to get the min and max
        var sortedData = apiData.sort(function(a, b){
            return a.value - b.value;
        });
            
        var data = {
            min: sortedData[0].value,
            max: sortedData[sortedData.length - 1].value,
            data: apiData
        };
          
        heatmapInstance.setData(data);     
    }

    function renderLegend(data){
        if(data){
            let toolTip = `Showing data for ${currentRegion}, based on ${data.length} data points`;
            let toolTipElem = $("<div class='legend'>");
            toolTipElem.append(toolTip);
            toolTipElem.appendTo('#heatmapContainer');
        }
    }

    // init functionality 
    function createNavigationList(){
        var list = document.getElementById('navigationList');
        constants.navigationRegions.forEach(function(region){
            let li = document.createElement('li');
            li.onclick = function(){
                navigateToRegion(region);
            }
            list.appendChild(li);

            li.innerHTML = region.label;
        });
    }

    function navigateToRegion(region){
        // navigated to same region.
        if(currentRegion === region.label){
            return; 
        }

        // update current region
        currentRegion = region.label;

        // clear whatever is on the right 
        const heatmapContainer = document.getElementById('heatmapContainer');
        heatmapContainer.innerHTML = "";
        // hide the about 
        $('#about-container').hide();

        // if about, show about 
        if(currentRegion === 'About'){
            showAboutRegion();
            return;
        }

        // fetch data for the region
        fetchClickData(region.apiName, fetchClickDataCallback);
    }
    
    function fetchClickDataCallback(region, data){
        // create image element and append to container
        const imageUrl = '/images/' + region + '.png';
        var imageElement = $('<img id="heatMapImage">');
        imageElement.attr('src', imageUrl);
        imageElement.attr('class', 'heat-map-image');
        imageElement.appendTo('#heatmapContainer');

        // remove spinner
        // async so that browser has time to render the image and calculate height
        setTimeout(function(){
            // update the container based on image size
            var height = $('#heatMapImage').height();
            var width = $('#heatMapImage').width();
            updateHeatMapContainerSize(height, width);
            // render the heat map
            renderHeatMap(data); 
            renderLegend(data);   
        }, 20) // not proud of this :( 
    }

    function updateHeatMapContainerSize(height, width){
        $('#heatmapContainer').height(height);    
        $('#heatmapContainer').width(width);
    }

    function showAboutRegion(){
        $('#about-container').show();
    }

    init();
})();