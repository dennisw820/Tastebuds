// Contact
const nodemailer = require('nodemailer');
const db = require('../../../../.config/mysql.js');

exports.handleContactReq = async (req, res, err, id, next) => {
    try{
        // Get User Data
        const {firstName, lastName, phone, email, subject, message} = req.body;
        // Validate Data
    
        // Store Contact Data
        const query = `INSERT INTO contact(firstName, lastName, phone, email, subject, message) VALUES(${firstName}, ${lastName}, ${phone}, ${email}, ${subject}, ${message})`
        await db.query(query)
        // Send Email
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            service: process.env.EMAIL_SERVICE,
            post: Number(process.env.EMAIL_POST),
            secure: Boolean(process.env.EMAIL_SECURE),
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PW
            }
        })
    
        // Send Confirmation
        msg = `We have received your request and will be contacting you soon.`;
        return res.status(200).json({}) 
        res.render('confirmation.ejs', {msg});
        res.redirect('/');

    }catch(err){
        res.status(400).json({err: err})
    }
}