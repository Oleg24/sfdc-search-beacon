(function(){
    var constants = {
        apiUrl: '/api/heatMap/',
        navigationRegions: [{
            name: 'about',
            label: 'About',
            image: null
        }, {
            name: 'recordPreview',
            label: 'Record Preview',
            image: 'recordPreview.png' 
        }, {
            name: 'searchSuggestions',
            label: 'Instant Results',
            image: 'searchSuggestions.png'
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
            
        var data = {
            min: 0,
            max: 50,
            data: apiData
        };
          
        heatmapInstance.setData(data);     
    }


    // init functionality 
    function createNavigationList(){
        var list = document.getElementById('navigationList');
        constants.navigationRegions.forEach(function(region){
            let li = document.createElement('li');
            li.onclick = function(){
                navigateToRegion(region.name);
            }
            list.appendChild(li);

            li.innerHTML = region.label;
        });
    }

    function navigateToRegion(region){
        // clear whatever is on the right 
        const heatmapContainer = document.getElementById('heatmapContainer');
        heatmapContainer.innerHTML = "";

        // if about, show about 
            // TODO handle the about logic

        // add spinner
        // fetch data for the region
        fetchClickData(region, fetchClickDataCallback);
    }
    
    function fetchClickDataCallback(region, data){
        const imageUrl = '/images/' + region + '.png';
        var imageElement = $('<img id="heatMapImage">');
        imageElement.attr('src', imageUrl);
        imageElement.attr('class', 'heat-map-image');
        imageElement.appendTo('#heatmapContainer');
        // remove spinner
        // draw the heat map based on the data
        renderHeatMap(data);    
    }

    function createAbout(){

    }

    init();
})();