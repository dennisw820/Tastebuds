// const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const uri = `mongodb+srv://peakdevelopment649:${process.env.MONGO_PASS}@cluster0.zhwh6.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
// const client = new MongoClient(uri);

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(con => {
    console.log(con.connections + `Connection successful!`)
})

module.exports = mongodb;