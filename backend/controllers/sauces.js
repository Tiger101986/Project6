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
        const url = req.protocol + '://' + req.get(host);
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