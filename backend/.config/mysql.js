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
    db.query(`INSERT INTO transactions (amount) VALUES ("100.00")`,(err, results, fields)=>{
        if(err) throw err;
        console.log(results[0]);
    });
    db.query(`SELECT * FROM transactions`, (err, results) => {
        if (err) throw err;
        console.log(results[0])
    })
    console.log('DB connection successful.')
}catch(err){
    res.sendStatus(400) 
    console.log(err)
}
module.exports = db;