// Reviews
const db = require('../../../../.configdb');
const validator = require('../../../../middleware/validate.js');
exports.postReview = (req, res, err, id, next) => {
        // Get User Data
        const review = {
            image: req.body.review-img,
            title: req.body.review-title,
            message: req.body.message
        }
           
        // Validate & Sanitize Data
        if(review.validator.isEmpty) res.status(400).json({message: "Review fields cannot be empty."})
        
        // Store Review
        try{
            const query = `INSERT INTO reviews(image, title, message) VALUES(${review.image}, ${review.title}, ${review.message})`;
            db.query(query);
        }catch(err){res.sendStatus(400);}
        
        // Send response
        msg = `Your review was successfully posted. Thank you!`;
        res.status(200).json({
            message: msg,
            data: review
        })
        res.render('confirmation.ejs', {msg})
        res.redirect('/');
}