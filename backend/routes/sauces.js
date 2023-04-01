//import express to set up route with Router() method
const express = require('express');
const { route } = require('../app');
const router = express.Router();

//import models folder 
const Thing = require('../models/thing');

/**
 * add some middleware 
 * Change use() to get() and post()-- app.use('/api/sauce', (req, res, next)
 * Use save() method to save Thing from .post() user input
 * Use find() method to get all Things in Database from .get()
 * Use findOne() method to gets specific/single one Thing from .get()
 */

// Replace app to router and each segment (api/sauces) to (/) instead after cut all of routes from app.js file to put inside sauces.js router
router.post('/', (req, res, next) => {
    const thing = new Thing({
        userId: req.body.userId,
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
        mainPepper: req.body.mainPepper,
        imageUrl: req.body.imageUrl,
        heat: req.body.heat,
        likes: req.body.likes,
        dislikes: req.body.dislikes,
        usersLiked: req.body.usersLiked,
        usersDisliked: req.body.usersDisliked,
    });
    thing.save()
        .then(() => {
            res.status(201).json({
                message: 'Post saved successfully!'
            });
        })
        .catch(
            (error) => {
                res.status(400).json({
                    error: error
                });
            }
        );
});

// Retrieving a Specific Thing - Single sauce with .get() and findOne() methods
router.get('/:id', (req, res, next) => {
    Thing.findOne({
        _id: req.params.id
    }).then((things) => {
        res.status(200).json(things);
    })
        .catch(
            (error) => {
                res.status(400).json({
                    error: error
                });
            }
        );
});

//Update an existing Thing with .put() and updateOne() methods
router.put('/:id', (req, res, next) => {
    const thing = new Thing({
        _id: req.params.id,
        userId: req.body.userId,
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
        mainPepper: req.body.mainPepper,
        imageUrl: req.body.imageUrl,
        heat: req.body.heat,
        likes: req.body.likes,
        dislikes: req.body.dislikes,
        usersLiked: req.body.usersLiked,
        usersDisliked: req.body.usersDisliked,
    });
    Thing.updateOne({ _id: req.params.id }, thing).then(
        () => {
            res.status(201).json({
                message: 'Thing updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

//Delete a Thing with .delete() and deleteOne() methods
router.delete('/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id }).then(
        () => {
            res.status(200).json({
                message: 'Deleted!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

// Retrieving a list of Thing - Array sauces
router.get('/', (req, res, next) => {
    Thing.find().then((things) => {
        res.status(200).json(things);
    }).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

//export router
module.exports = router;