// Dependencies 
const express = require('express');
const router = require('./api/src/v1/routes/router.js');
// const mongodb = require('./.config/mongodb');
const passport = require('./.config/passport.js');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
var cookieSession = require('cookie-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

require('dotenv').config();

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/../frontend/views`);
// app.use(session({
    //     secret: process.env.SECRET,
    //     resave: true,
    //     saveUninitialized: true
    // }));
    
    // Middleware
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(cors());
    // require static for static routes
    app.use(express.static(__dirname));
    app.use(express.static('private'));
    app.use("/", router);
    
    
app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}.`);
});

// module.exports = app;