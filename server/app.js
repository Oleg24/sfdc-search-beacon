let express = require('express');
let connectDb = require('./models/models');
let seedFeatureBoundary = require('./misc/seedFeatureBoundary');
let seedRecordPreviewClicks = require('./misc/seedRecordPreviewClicks');

let app = express();

app.get('/', (req, res) => {
    res.send('hello sfdc');
});

const port = 3000;
connectDb().then(() => {
    seedFeatureBoundary();
    seedRecordPreviewClicks();
    app.listen(port, ()=> {
        console.log("SFDC Beacon app listening at port: ", port);
    });
})