// Resources
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const session = require('express-session');
// const itemSchema = require('.././models/model.js');
// Middleware
const db = require('../../../../.config/mysql.js');
const router = require("../routes/router.js");
const validator = require('../../../../middleware/validate.js');
const authenticator = require('../../../../middleware/authenticate.js');
const json = require('json');


// Route Handlers

// Get Request: Home
exports.getHome = (req, res, next) => {
    try {
        res.render('index.ejs');
    }
    catch (err) {console.log(err);}
    next();
}

    // Login
    exports.handleLoginReq = async (req, res, err, id, next) => {
        // Get, Validate & Sanitize  Data
        let {userName, password} = req.body;
        if(!userName && password) {
            return res.status(400).json({
                status: "Failed",
                message: "Fields cannot be empty. Please fill out fields and try again."
            })
            // TODO: Add Validation 
        }else if(validator.isUsernameTaken(userName)) {
        }

        // Check for User in DB
        let query = `SELECT ${/*USERNAME & PASSWORD*/db} FROM ${/*USER TABLE*/db} WHERE ${/*USERNAME & PASSWORD*/db} = ${/*USERNAME & PASSWORD*/db}`;
        try {
            await db.query(query)
            if(results.length > 0) {
                // Compare User Input to Password
                const match = await bcrypt.compare(password, results.password, (match) => {
                    if (match) {
                        // Create & Assign Access and Refresh Tokens
                        const accessToken = jwt.sign(
                            {"username": results.username},
                            process.env.ACCESS_TOKEN_SECRET,
                            {expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN}
                        )
                        const refreshToken = jwt.sign(
                            {"username": results.username},
                            process.env.REFRESH_TOKEN_SECRET,
                            {expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN}
                        )

                        // Create User Session
                        req.session.authenticated = true;
                        req.session.user = {username, password};
                        res.status(200).json({
                            "status": "OK",
                            "message": "Login successful."
                        })
                        // res.redirect('/welcome');
                        res.render('/welcome', {user: req.session.user});
                    }
                })
            }
        }
        catch(err) {
            res.status(400).json({
                "status": "Failed",
                "message": err
            })
        }
        db.destroy();
        // next();
    }

    // // Welcome
    // exports.handleWelcomeReq = (req, res) => {
    //     res.render('welcome.ejs', {user, user});
    // }

    // Signup
    exports.handleSignUp = async (req, res, err, id, token, hassedPassword, next) => {
        // Get & Validate Data
        var userName = req.body.userName;
        var email = req.body.email;
        var password = req.body.password;
        var password2 = req.body.password2;
        var ackw = req.body.ackw;
        try{
            // TODO: Validate Data  
            if(
                !userName ||
                !email ||
                !password ||
                password != password2) {
                    res.status(400).json({
                        status: "Failed",
                        message: "Fields cannot be empty. Please fill out fields and try again."
                    })
                }

            // Create Token
            const token = jwt.sign(
                // TODO: Get user ID from DB
                {user_id: user_id, userName}, 
                process.env.TOKEN_KEY,
                {expiresIn: "1h"}
            )

            return res.status(200).json({"status": "OK", "data": token})

            // Salt Password
            const hassedPassword = await bcrypt.hash(password, 5);
            
            // Store in DB
            var query = `INSERT INTO ${/*table name*/db} VALUES(${userName}, ${email}, ${hassedPassword})`;
            await db.query(query)

            // Verify Submission & Send Confirmation & Redirect
            if(db.query(query)) return res.status(200).json({"success": `User ${userName} successfully created!`}).then(res.redirect('/login'))
        }catch(err) {
            return res.status(400).json({err: "There was an error creating the user."})
        }
    }

    // Edit Profile
    exports.updateProfile = async (req, res, err, id, next) => {
        // Get User Profile from DB
        // Update User Data & Store Changes in DB
    }

    // Password Reset
    exports.handlePwResetReq = async (req, res, err, id, next) => {

    }

    // Forgot Password
    exports.handleForgotPwReq = async (req, res, err, id, next) => {

    }

    // Checkout
    exports.handleCheckoutReq = async (req, res, err, id, next) => {
        // Display Items in Cart
        // set timeout
        msg = `Your order was successfully placed. You will receive an email regarding your order confirmation shortly.`;
        res.render('confirmation.ejs', {msg});
    }

    exports.addToCart = async (req, res, err, id, next) => {
        // Add Item to Cart Localstorage
    }

    // Help
    exports.handleHelpReq = async (req, res, err, id, next) => {
        var query = req.body.query;
    }

    // Contact
    exports.handleContactReq = async (req, res, err, id, next) => {
        msg = `We have received your request and will be contacting you soon.`;
        res.render('confirmation.ejs', {msg});
    }