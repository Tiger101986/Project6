//import bcrypt and user models
const bcrypt = require('bcrypt');
const User = require('./models/user');

// Use Promise .then() with bcrypt's hash() method, use it to save users' passwords securely in the database 
exports.signUp = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save().then(
                () => {
                    res.status(201).json({ message: 'User added successfully!' });
                }
            ).catch(
                (error) => {
                    res.status(500).json({ error: error });
                }
            );
        }
    );
};

exports.logIn = (req, res, next) => {
    User.findOne({ email: req.body.email}).then(
        (user) => {
            if (!user) {
                return res.status(401).json({
                    error: new Error('User not found!')
                });
            }
            bcrypt.compare(req.body.password, user.password).then(
                (valid) => {
                    if (!valid) {
                        return res.status(401).json({
                            error: new Error('Incorrent password!')
                        });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: 'token'
                    });
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: error
                    });
                }
            );
        }
    ).catch(
        (error) => {
            res.status(500).json({
                error: error
            });
        }
    );
}