// Resources
// const db = require(__dirname + '/backend/.config/mysql.js');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { authController } = require('passport');

// Middleware
// db.connect();
// const decoded;
exports.authenticate = (async (req, res, next, token, decoded, promisify) => {
    // 1. Check for Token Existence & Get Token
    try {
        if (!token) {
            return res.status(403).json({err: 'You are not logged in! Please log in to get access.'})
        }
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            const token = req.headers.authorization.split(' ')[1];
        }
        // console.log(token)

        // 2. Token Verification
        await promisify(jwt.verify)(token, process.env.TOKEN_KEY, (err, decoded)=>{
            if(err) return res.sendStatus(403);
            req.user = decoded.username;
            console.log(decoded);
        })

        // 3. Next
        next();
    }
    catch(err) {
        res.status(400).json({
            "status": "Failed",
            "message":"Error processing request."
        })
    }

});

// module.exports = authController;