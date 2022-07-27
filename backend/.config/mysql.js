const mysql = require('mysql');
const db = db.createConnection({
    host     : /*process.env.DB_HOST*/'localhost',
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database : process.env.DB
});
db.connect((err) => {
    if(err) console.log('Error connecting to database: ' + err);
});
module.exports = db;