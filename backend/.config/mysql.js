require('dotenv').config();
const mysql = require('mysql');
const db = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database : process.env.DB
});
try{
    db.connect()
    console.log('DB connection successful.')
}catch(err){
    res.sendStatus(400) 
    console.log(err)
}
module.exports = db;