// Dependencies 
const express = require('express');
const session = require('express-session');
const router = require('./api/src/v1/routes/router.js');
// const mongodb = require('./.config/mongodb');
const db = require('./.config/mysql.js')
const passport = require('./.config/passport.js');
const bcrypt = require('bcryptjs');
var cookieSession = require('cookie-session');
const helmet = require('helmet');
const hpp = require('hpp');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const fs = require('fs');

const app = express();

require('dotenv').config();

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/../frontend/views`);
const store = new session.MemoryStore();

    // Middleware
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(helmet());
    app.use(xss());
    app.use(hpp());
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
    app.use(morgan('dev'));
    
    // Limit Request Rate
    const limiter = rateLimit({
        max: 100,
        windowMs: 60 * 60 * 1000,
        message: 'Too many requests from this IP, please try again in an hour.' 
    })
    app.use('/app', limiter);
    
app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}.`);
});

// module.exports = app;