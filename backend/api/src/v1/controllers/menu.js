 // Menu
// Get Request: All Currently Serving
exports.getItems = async (req, res, err, results, next) => {
    try {
        // const items = await item.find(); *MongoDB
        // Write & Execute Query
        var query = `SELECT * FROM ${/*db.table*/ db} WHERE stillServing = true;`;
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
// Get Request Currently Serving
exports.getItem = async (req, res, results, err, next) => {
    try {
        // Get ID
        var id = req.params.id;
        // const item = await item.findById(req.param.id); *MongoDB
        var query = `SELECT * FROM menu WHERE id = id AND is_available = true;`;
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

// Patch Request: Menu Item
exports.updateItem = async (req, res, id, err, results, fields, next) => {
    try {
        // const overwrittenItem = await item.put(req.body); *MongoDB

        var id = req.params.id;
        let query = `UPDATE menu SET ? = ?;`;


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

// Post Request: Menu Item
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
      // Create Menu Item Object *UPDATE PROPERTIES
      const newItem = {
          title: req.body.title,
          duration: req.body.duration,
          description: req.body.description
      }
      
    try {
        // Write Query & Execute
            // ***Avoid including sensitive info in query
        let query = `INSERT INTO TABLE menu (title, description, price, quantity, is_available, rating, category, cuisine, allergens, ingredients, preparation_time, is_vegan, is_vegetarian, is_gluten_free) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?);`;
        var createdItem = await db.query(query, [newItem.title, newItem.duration, newItem.description, newItem.price, newItem.quantity, newItem.is_available, newItem.rating, newItem.category, newItem.cuisine, newItem.allergens, newItem.ingredients, newItem.preparation_time, newItem.is_vegan, newItem.is_vegetarian, newItem.is_gluten_free], (err, results, fields) => {
            if(err) {
                return res.status(400).json({error: 'There was an error submitting your request.'});
                console.log(err);
            }
            else {
                return res.status(200).json({
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

// Delete Request: Menu Item
exports.deleteItem = async (req, res, id, err, next) => {
    try {
        // const deletedItem = await item.findByIdAndDelete(req.params.id); *MongoDB

        // Get Param ID
        let id = req.params.id;

        // Write Query & Execute
        // ***Avoid including sensitive info in query
        let query = `DELETE FROM menu WHERE ${/*table.id*/db} = ?;`;
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