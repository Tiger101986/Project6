//import express to set up route with Router() method
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('..middleware/multer-config');
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
router.post('/', auth, multer, sauceControllers.createThing);

// Retrieving a Specific Thing - Single sauce with .get() and findOne() methods
router.get('/:id', auth, sauceControllers.getOneThing);

//Update an existing Thing with .put() and updateOne() methods
router.put('/:id', auth, sauceControllers.modifyThing);

//Delete a Thing with .delete() and deleteOne() methods
router.delete('/:id', auth, sauceControllers.deleteThing);

// Retrieving a list of Thing - Array sauces
router.get('/', auth, sauceControllers.getAllThings);

//export router
module.exports = router;