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
    db.query(`CREATE TABLE contact(
        contact_id INT(100) AUTO_INCREMENT PRIMARY KEY,
        first_name CHAR(50) NOT NULL,
        last_name CHAR(50) NOT NULL,
        phone INT(15) NOT NULL,
        email VARCHAR(75) NOT NULL,
        subject VARCHAR(75) NOT NULL,
        message VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        last_modified DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);`)
    console.log('DB connection successful.')
}catch(err){
    res.sendStatus(400) 
    console.log(err)
}
module.exports = db;