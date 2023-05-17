// Resources
const db = require('../.config/mysql.js');
const jwt = require('jsonwebtoken');
// const { promisify } = require('util');
const { authController } = require('passport');

// Middleware
// const decoded;
exports.authenticate = async (req, res, next, err, token, decoded) => {
    // 1. Check for Token Existence & Get Token
        if (!token) {
            return res.status(403).json({err: 'You are not logged in! Please log in to get access.'})
        }
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            const token = req.headers.authorization.split(' ')[1];
        }
        // console.log(token)

        // 2. Token Verification
        try{ await promisify(jwt.verify)(token, process.env.TOKEN_KEY, (err, decoded)=>{
                req.user = decoded.username;
                console.log(decoded);
            })
        }catch(err) {
            res.status(400).json({
                "status": "Failed",
                "message":"Error processing request."
            })
        }
        // TODO: Disable authorization after user changes pw 
        // Check if User Still Exist
        try{
            const query = `SELECT id FROM users WHERE id = ${decoded.id}`;
            const freshUser = await db.query(query);
            if(!freshUser) {
                return res.json({err: "The user belonging to this token no longer exist."})
            }
            // Check Last Time User Changed Pw
            // await freshUser.changedPWAfter(decoded, iat);
        }catch(err){return res.status(400).json({"message": "There was an error processing the request."})}
        
        // Last. Next
        next();
}