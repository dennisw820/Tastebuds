// Resources
const db = require('../.config/mysql.js');
const bcrypt = require('bcryptjs');

// Error Handler
exports.errorHandler = (error, next) => {
    if (error) {
        console.log(error);
        throw error;
    }
    return;
    next();
}
// Checks if Data is Empty (Returns Boolean)
exports.isEmpty = (req, res, next) => {
    //verify that email, username, and password are not empty
    console.log(req.body);
    if (req.body.email === "" || req.body.username === "" || req.body.password === "" || req.body.review) {
        return true;
        res.json({
        type: "error", 
        message: "Please fill out all fields"
        });
    }else {
        return false;
    }
    next();
}
// Checks if Email (Returns Boolean)
exports.isEmail = (req, res, next) => {
    //verify that email is valid
    if (!req.body.email.includes("@") || !req.body.email.includes(".")) {
        return false
        res.json({
            type: "error", 
            message: "Please enter a valid email"
        });
    }else {
        return false;
    }
    next();
}
// Checks if Username Exists (Returns Boolean)
exports.isUsernameTaken = (req, res, err, row, next) => {
    //verify that username is not already in use
    db.query("SELECT * FROM users WHERE username = ?", [req.body.username], (err, row) => {
        if (row) {
            return true;
            res.json({
                type: "error", 
                message: "Username already in use"
            });
        }else {
            return false;
        }
    })
    next();
}
// Checks if Password is Length Valid(Returns Boolean)
exports.isLengthValid = (req, res, next) => {
    //verify that password is at least 8 characters long
    if (req.body.password.length < 8) {
        return false;
        res.json({
          type: "error", 
          message: "Password must be at least 8 characters long."
        });
    }else {
        return true;
    }
    next();
}
// Checks if Password Contains At Least One Number, Letter & Lowercase Letter(Returns Boolean)
exports.isPasswordSecure = (req, res, next) => {
    //verify that password is at least one number, one uppercase letter, and one lowercase letter
    if (!req.body.password.match(/[a-z]/i) || !req.body.password.match(/[A-Z]/i) || !req.body.password.match(/[0-9]/i)) {
        return false;
        res.json({
          type: "error", 
          message: "Password must contain at least one number, one uppercase letter, and one lowercase letter."
        });
    }else {
        return true;
    }
    next();
}
// Checks if Email is Taken(Returns Boolean)
exports.isEmailTaken = (req, res, err, row, next) => {
    //verify that email is not already in use
    db.query("SELECT * FROM users WHERE email = ?", [req.body.email], async (err, row) => {
        if (row) {
            return true;
            res.json({
                type: "error", 
                message: "Email already in use"
            });
        }else {
            return false;
        }
    })
    next();
}
