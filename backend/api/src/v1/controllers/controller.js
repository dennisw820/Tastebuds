// Resources
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const itemSchema = require('.././models/model.js');
const db = require('../../../../.config/mysql.js');
const validate = require('./validate.js');
const json = require('json');

// Route Handlers

    // Menu
// Get Request: All
exports.getItems = async (req, res, err, results, next) => {
    try {
        // const items = await item.find(); *MongoDB
        // Write & Execute Query
        var query = `SELECT * FROM ${/*db.table*/ db};`;
        var items = await db.query(query);
        res.status(200).json({
            status: 'success',
            data: {
                items: items
            }
        })
    }
    catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err
        })
    }
    db.destroy();
    next();
}
// Get Request
exports.getItem = async (req, res, results, err, next) => {
    try {
        // Get ID
        var id = req.params.id;
        // const item = await item.findById(req.param.id); *MongoDB
        var query = `SELECT * FROM ${/*db.table*/ db} WHERE id = id;`;
        var item = await db.query(query);
        res.status(200).json({
            status: 'success',
            data: {
                item: item
            }
        })
    }
    catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err
        })
    }
    db.destroy();
    next();
}


// // Get Request: Filter
// exports.getFilteredItems = async (req, res, next) => {
//     try {
//         // Build Query
//         // const queryObj = {...req.query};
//         // const excludedFields = ['page', 'sort', 'limit', 'fields'];
//         // excludedFields.forEach(el => delete queryObj);
        
//         // Execute Query
//         // const query = item.find(queryObj);*MongoDB
//         const items = await query;
        
//         // Send Response
//         res.status(200).json({
//             status: 'success',
//             data: {
//                 items: items
//             }
//         })
//     }
//     catch (err) {
//         res.status(400).json({
//             status: 'failed',
//             message: err
//         })
//     }
// }

// Patch Request
exports.updateItem = async (req, res, id, err, results, fields, next) => {
    try {
        // const overwrittenItem = await item.put(req.body); *MongoDB

        var id = req.params.id;
        let query = `UPDATE ${/*db.table*/db} SET ? = ?;`;


        // Write Query & Execute
        // ***Avoid including sensitive info in query
        var updatedItem = await db.query(query,[`${/*db.column.toupdate*/db}, ${/*appdata.value*/db}`], (err, results, fields) =>{
            if(err) {
                res.status(400).json({error: 'There was an error fetching your request.'});
                console.log(err);
            }
            else {
                res.status(200).json({
                    status: "OK",
                    data:overwrittenItem
                });
                console.log(`${results}`);
            }
        });
    } catch(err) {

    }
}   

// Post Request
exports.createItem = async (req, res, err, next) => {
    // const newItem = await item.create(req.body);*MongoDB

      // Extract Item
      const { body } = req;
      // Validate Item
      if( 
          !body.title ||
          !body.duration ||
          !body.description
      ) {
          res.send('Fields empty. Please enter data to continue.');
      }
      // Create Workout Object *UPDATE PROPERTIES
      const newItem = {
          title: req.body.title,
          duration: req.body.duration,
          description: req.body.description
      }
      
    try {
        // Write Query & Execute
            // ***Avoid including sensitive info in query
        let query = `INSERT INTO TABLE ${/*db.table*/db} (${/*db.columns*/db}) VALUES(?,?,?,?);`;
        var createdItem = await db.query(query, [newItem.title, newItem.duration, newItem.description], (err, results, fields) => {
            if(err) {
                res.status(400).json({error: 'There was an error submitting your request.'});
                console.log(err);
            }
            else {
                res.status(200).json({
                  status: "OK",
                  "message":"Data submission successful.",
                  data: createdItem
                });
                console.log(`Record added successfully.`)
            }
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err
        })
    }
    db.destroy();
    next();
}

// Delete Request
exports.deleteItem = async (req, res, id, err, next) => {
    try {
        // const deletedItem = await item.findByIdAndDelete(req.params.id); *MongoDB

        // Get Param ID
        let id = req.params.id;

        // Write Query & Execute
        // ***Avoid including sensitive info in query
        let query = `DELETE FROM ${/*db.table*/db} WHERE ${/*table.id*/db} = ?;`;
            var deletedRecord = await db.query(query,[`${id}`], (err, results, fields) =>{
                if(err) {
                    res.status(400).json({error: 'There was an error fetching your request. Please try again.'});
                    console.log(err);
                }
                else {
                    res.status(200).json({
                        status: "OK",
                        "message": "Record deleted.",
                    });
                    console.log(`${results}`);
                }
            });
    }catch(err) {
            
    }
    db.destroy();
    next();
}

    // Signin
    exports.signIn = async (req, res, err, id, next) => {
        // Get, Validate & Sanitize  Data
        let {userName, password} = req.body;
        if(!userName && password) {
            res.status(400).json({
                status: "Failed",
                message: "Fields cannot be empty. Please fill out fields and try again."
            });
        }

        // Check for User
        let query = `SELECT ${/*USERNAME & PASSWORD*/db} FROM ${/*USER TABLE*/db} WHERE ${/*USERNAME & PASSWORD*/db} = ${/*USERNAME & PASSWORD*/db}`;
        try {
            await db.query(query)
            if(results.length > 0) {
                res.status(200).json({
                    "status": "OK",
                    "message": "Login successful."
                })
                res.render('../../../../../frontend/views/welcome.ejs')
            }
        }
        catch(err) {
            res.status(400).json({
                "status": "Failed",
                "message": err
            })
        }

        db.destroy();
        next();
    }
    
    // Signup
    exports.signUp = async (req, res, err, id, token, next) => {
        // Get & Validate Data
        var userName = req.body.userName;
        var email = req.body.email;
        var password = req.body.password;
        var password2 = req.body.password2;
        var ackw = req.body.ackw;
        try{
            // TODO: Check if: fields are empty, password contains 8 characters 1 capital letter and special character, if user already exist w/ validate.js  
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
                {expiresIn: "5h"}
            )

            // Salt Password

            // Store in DB
            var query = `INSERT INTO ${/*table name*/db} VALUES(${userName}, ${email}, ${password})`;
            db.query(query)
            // Verify Submission & Send Confirmation & Redirect
            res.status(200).json({}).then(res.redirect('/login'))
        }
        catch(err) {
            res.status(400).json({})
        }
    }

    // Edit Profile
    exports.updateProfile = async (req, res, err, id, next) => {

    }

    // Password Reset
    exports.resetPassword = async (req, res, err, id, next) => {

    }

    // Forgot Password
    exports.forgotPassword = async (req, res, err, id, next) => {

    }

    // Commerce
    exports.processPayment = async (req, res, err, id, next) => {

    }

    exports.checkoutConfirmation = async (req, res, err, id, next) => {
        // set timeout
        msg = `Your order was successfully placed. You will receive an email regarding your order confirmation shortly.`;
        res.render('confirmation.ejs', {msg});
    }

    exports.addToCart = async (req, res, err, id, next) => {

    }

    // Location
    exports.locate = async (req, res,err, id, next) => {
        var location = req.body.location;

        res.render('location.ejs');
    }

    // Help
    exports.submitHelpRequest = async (req, res, err, id, next) => {
        var query = req.body.query;
    }

    // Reviews
    exports.postReview = async (req, res, err, id, next) => {
        msg = `Your review was successfully posted. Thank you!`;
        // var reviewImage = req.body.review-img;
        // var reviewTitle = req.body.review-title;
        // var review = req.body.review;
        res.render('confirmation.ejs', {msg})
    }

    // Contact
    exports.contact = async (req, res, err, id, next) => {
        msg = `We have received your request and will be contacting you soon.`;
        res.render('confirmation.ejs', {msg});
    }