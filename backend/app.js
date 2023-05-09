// Dependencies 
const express = require('express');
const session = require('express-session');
const router = require('./api/src/v1/routes/router.js');
// const mongodb = require('./.config/mongodb');
const db = require('./.config/mysql.js')
const passport = require('./.config/passport.js');
const bcrypt = require('bcryptjs');
var cookieSession = require('cookie-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

require('dotenv').config();

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/../frontend/views`);
const store = new session.MemoryStore();

    // Middleware
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(cors());
    app.use(session({
        secret: process.env.SECRET,
        cookie: {maxAge:300000, secure: true, sameSite: "none"},
        resave: false,
        saveUninitialized: false,
        store
    }))
    // require static for static routes
    app.use(express.static(__dirname));
    app.use(express.static('private'));
    app.use("/api/src/v1", router);
    
    
app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}.`);
});

// module.exports = app;