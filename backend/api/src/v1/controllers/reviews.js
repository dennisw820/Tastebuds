    // Reviews
    exports.postReview = async (req, res, err, id, next) => {
        msg = `Your review was successfully posted. Thank you!`;
        // var reviewImage = req.body.review-img;
        // var reviewTitle = req.body.review-title;
        // var review = req.body.review;
        res.render('confirmation.ejs', {msg})
    }