//import express to set up route with Router() method
const express = require('express');
const router = express.Router();
const sauceControllers = require('../controllers/sauces');

/**
 * add some middleware 
 * Change use() to get() and post()-- app.use('/api/sauce', (req, res, next)
 * Use save() method to save Thing from .post() user input
 * Use find() method to get all Things in Database from .get()
 * Use findOne() method to gets specific/single one Thing from .get()
 * Use updateOne() method to modify an existing Thing from .put()
 * Use deleteOne() method to delete a Thing from .delete()
 */

// Replace app to router and each segment (api/sauces) to (/) instead after cut all of routes from app.js file to put inside sauces.js router
//Get and save data from user input 
router.post('/', sauceControllers.createThing);

// Retrieving a Specific Thing - Single sauce with .get() and findOne() methods
router.get('/:id', sauceControllers.getOneThing);

//Update an existing Thing with .put() and updateOne() methods
router.put('/:id', sauceControllers.modifyThing);

//Delete a Thing with .delete() and deleteOne() methods
router.delete('/:id', sauceControllers.deleteThing);

// Retrieving a list of Thing - Array sauces
router.get('/', sauceControllers.getAllThings);

//export router
module.exports = router;