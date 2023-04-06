//import models folder 
const Thing = require('../models/thing');

exports.createThing = (req, res, next) => {
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
};

// Retrieving a Specific Thing - Single sauce with .get() and findOne() methods
exports.getOneThing = (req, res, next) => {
    Thing.findOne({
        _id: req.params.id
    }).then((things) => {
        res.status(200).json(things);
    }).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );        
};

//Update an existing Thing with .put() and updateOne() methods
exports.modifyThing = (req, res, next) => {
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
}

//Delete a Thing with .delete() and deleteOne() methods
exports.deleteThing =(req, res, next) => {
    Thing.findOne({_id: req.params.id}).then(
        (thing) => {
            if (!thing) {
                return res.status(404).json({
                    error: new Error('No such Thing!')
                });
            }
            if (thing.userId !== req.auth.userId) {
                return res.status(400).json({
                    error: new Error('Unauthorized request!')
                });
            }
        }
    )
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
}

// Retrieving a list of Thing - Array sauces
exports.getAllThings = (req, res, next) => {
    Thing.find().then((things) => {
        res.status(200).json(things);
    }).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}