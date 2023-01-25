// Resources
const db = require(__dirname + '/backend/.config/mysql.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const { authController } = require('passport');

// Middleware
// db.connect();
const decoded;
exports.protect = (async (req, res, next, token, decoded, promisify) => {
    // 1. Check Esistence & Get Token
    // console.log(req.headers)
    // let token;
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            const token = req.headers.authorization.split(' ')[1];
        }
        console.log(token)
        if (!token) {
            return next('You are not logged in! Please log in to get access.', 401)
        }
    }
    // 2. Token Verification
    decoded = await promisify(jwt.verify)(token, process.env.TOKEN_KEY)
    console.log(decoded);
    // 3. Check if User Still Exist

    // 4. Check if User Changed Password After JWT Issued
    catch(err) {
        res.status(400).json({
            "status": "Failed",
            "message":"Error processing request."
        })
    }
    next();
});

// module.exports = authController;