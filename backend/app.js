// Dependencies 
const express = require('express');
const router = require('./api/routes/router.js.js.js');// Contact
// const mongodb = require('./.config/mongodb');
const passport = require('./.config/passport.js');
const mysql = require('mysql');
var cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

require('dotenv').config();

app.set('view engine', 'ejs');
// app.use(session({
    //     secret: process.env.SECRET,
    //     resave: true,
    //     saveUninitialized: true
    // }));
    
    // Middleware
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    // require static for static routes
    app.use(express.static(__dirname));
    app.use(express.static('private'));
    
    
app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}.`);
});