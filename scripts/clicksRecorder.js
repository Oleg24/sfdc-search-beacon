document.addEventListener('click', function(e){
// Get mouse click coordinates and window size.
var params = { pageX : e.pageX, 
               pageY: e.pageY, 
               windowHeight: window.innerHeight, 
               windowWidth: window.innerWidth};

// target string
var target = e.target.classList? 
        'Search-Beacon-'+e.target.classList[e.target.classList.length-1] : 
        'Search-Beacon-Unknown';

//Log click interation with coordinates data
$A.metricsService.transaction('ltng', 'interaction', {
            context: {
                eventSource: 'synthetic-click',
                eventType : 'user',
                locator: {
                    target: target,
                    scope: 'Search-Beacon',
                    context: params
                }
            }
        });
}) 