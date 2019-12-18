let mongoose =  require('mongoose');

const DB_URL = "mongodb://localhost:27017/beacon-db"

const connectDb = () => {
    return mongoose.connect(DB_URL);
}

module.exports = connectDb;