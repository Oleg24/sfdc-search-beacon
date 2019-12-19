let express = require('express');
let connectDb = require('./models/models');
const bodyParser = require('body-parser');
let dbConnection;

// only needed for seeding 
let seedFeatureBoundary = require('./misc/seedFeatureBoundary');
let seedRecordPreviewClicks = require('./misc/seedRecordPreviewClicks');

// services
let getClickHeatMapData = require('./services/clickHeatMapDataService');

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/**
 * Routes
 */
app.get('/', (req, res) => {
    res.send('hello sfdc');
});

app.get('/api/heatMap/:region', function(req, res){
    // fetch data for the region
    getClickHeatMapData(req, res);
});

const port = 3000;
connectDb().then((db, err) => {
    dbConnection = db;
    // Uncomment the following if you need to seed either collection
    // seedFeatureBoundary();
    // seedRecordPreviewClicks();
    app.listen(port, ()=> {
        console.log("SFDC Beacon app listening at port: ", port);
    });
})