//import models folder 
const Sauce = require('../models/sauce');
const fileSystem = require('fs')

exports.createSauce = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    req.body.sauce = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        userId: req.body.sauce.userId,
        name: req.body.sauce.name,
        manufacturer: req.body.sauce.manufacturer,
        description: req.body.sauce.description,
        mainPepper: req.body.sauce.mainPepper,
        imageUrl: url + '/images/' + req.file.filename,
        heat: req.body.sauce.heat,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
    });
    sauce.save()
        .then(() => {
            res.status(201).json({
                message: 'Sauce saved successfully!'
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
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    }).then((sauces) => {
        res.status(200).json(sauces);
    }).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

//Update an existing Sauce with .put() and updateOne() methods
exports.modifySauce = (req, res, next) => {
    let sauce = new Sauce({ _id: req.params._id });
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        req.body.sauce = JSON.parse(req.body.sauce);
        sauce = {
            _id: req.params.id,
            userId: req.body.sauce.userId,
            name: req.body.sauce.name,
            manufacturer: req.body.sauce.manufacturer,
            description: req.body.sauce.description,
            mainPepper: req.body.sauce.mainPepper,
            imageUrl: url + '/images/' + req.file.filename,
            heat: req.body.sauce.heat,
            likes: 0,
            dislikes: 0,
            usersLiked: [],
            usersDisliked: [],
        };
    } else {
        sauce = {
            _id: req.params.id,
            userId: req.body.userId,
            name: req.body.name,
            manufacturer: req.body.manufacturer,
            description: req.body.description,
            mainPepper: req.body.mainPepper,
            imageUrl: req.body.imageUrl,
            heat: req.body.heat,
            likes: 0,
            dislikes: 0,
            usersLiked: [],
            usersDisliked: [],
        }
    }
    Sauce.updateOne({ _id: req.params.id }, sauce).then(
        () => {
            res.status(201).json({
                message: 'Sauce updated successfully!'
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

//Delete a Sauce with .findOne(), fs.unlink() and deleteOne() methods
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }).then(
        (sauce) => {
            if (!sauce) {
                return res.status(404).json({
                    error: new Error('No such Sauce!')
                });
            }
            if (sauce.userId !== req.auth.userId) {
                return res.status(400).json({
                    error: new Error('Unauthorized request!')
                });
            }
            const filename = sauce.imageUrl.split('/images/')[1];
            fileSystem.unlink('images/' + filename, () => {
                Sauce.deleteOne({ _id: req.params.id }).then(
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
        }
    );
};

// Retrieving a list of Thing - Array sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find().then((sauces) => {
        res.status(200).json(sauces);
    }).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

/**
 * TODO: 
 * The id for the post will be in the url, and can be fetched in the code from req.params.id 
 * (just like what was done for getting one post based on the id provided in the url)
 * The userId and “like” number (either 1, 0, or -1 -- see API requirements) will be provided in the req.body
 *  (just like when the sauce is updated)
 * if like is “1", then check to see if the user has already disliked the sauce -- and if so, 
 * then remove their user id from the dislikes array and decrease the dislike count
 * if the like is “-1”, do the opposite of what is described for “1"
 * if the like is “0”, then do what is. being done for “1" and “-1” to remove the user (if exists) from either likes or dislikes info
 * Use Sequelize the update the sauce (like you did for update sauce, but this time for the updated like information)
    * likes: 0,
    * dislikes: 0,
    * usersLiked: [],
    * usersDisliked: [],                                
*/

// Save likes status from users
exports.likeSauce = (req, res, next) => {
    let like = req.body.like;
    let userId = req.body.userId;
    Sauce.findOne({ _id: req.params.id }).then(sauce => {
        if (like === 1) {
            if (!sauce.usersLiked.includes(userId)) {
                sauce.usersLiked.push(userId);
                sauce.likes++;
            }
        }
        if (like === 0) {
            if (sauce.usersLiked.includes(userId)) {
                sauce.usersLiked = sauce.usersLiked.filter(id => id !== userId);
                sauce.likes--;
            }
            if (sauce.usersDisliked.includes(userId)) {
                sauce.usersDisliked = sauce.usersDisliked.filter(id => id !== userId);
                sauce.dislikes--;
            }

        }
        if (like === -1) {
            if (!sauce.usersDisliked.includes(userId)) {
                sauce.usersDisliked.push(userId)
                sauce.dislikes++;
            }
        }
        Sauce.updateOne({ _id: req.params.id }, sauce).then(() => {
            res.status(201).json({ message: 'Sauce updated successfully.' })
        })
    })
} 
