//import model of sauce folder and bilt-in module file system fs()  
const Sauce = require('../models/sauce');
const fileSystem = require('fs')

//Creating sauce card and save 
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

// Displaying single sauce card
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

//Updating an existed Sauce card
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

//Delete a Sauce card
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }).then(
        (sauce) => {
            if (!sauce) {
                return res.status(404).json({
                    error: new Error('No such Sauce!')
                });
            }
            if (sauce.userId !== req.auth.userId) {
                return res.status(403).json({
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

// Display all sauce cards
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

// Updating sauce card wiht likes/dislikes status from users
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
