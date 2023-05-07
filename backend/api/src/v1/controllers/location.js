 // Location
 exports.handleLocationReq = async (req, res,err, id, next) => {
    var location = req.body.location;

    res.render('location.ejs');
}
