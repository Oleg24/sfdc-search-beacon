let express = require('express');
let app = express();

app.get('/', (req, res) => {
    res.send('hello sfdc');
});

var server = app.listen(3000, ()=> {
    const host = server.address().address;
    const port = server.address().port;
    console.log('SFDC Beacon app listening at http://%s:%s', host, port);
});