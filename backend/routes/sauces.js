//import express to set up routes with Router() method
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sauceControllers = require('../controllers/sauces');

// Create sauce router with .post() method
router.post('/', auth, multer, sauceControllers.createSauce);

// Retrieving a Specific sauce - Single sauce router with .get() methods
router.get('/:id', auth, sauceControllers.getOneSauce);

//Update an existing sauce router with .put()methods
router.put('/:id', auth, multer, sauceControllers.modifySauce);

//Delete sauce router with .delete() methods
router.delete('/:id', auth, sauceControllers.deleteSauce);

// Retrieving a list of sauces - Array sauces router with get() method
router.get('/', auth, sauceControllers.getAllSauces);

//Users like status router 
router.post('/:id/like', auth, sauceControllers.likeSauce);

//export router
module.exports = router;