let mongoose =  require('mongoose');
let appConstants  = require('../constants');

const connectDb = () => {
    return mongoose.connect(appConstants.DB_URL);
}

module.exports = connectDb;