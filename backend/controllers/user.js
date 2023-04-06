//import bcrypt and user models
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/user');

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
            /**
             * use bcrypt.compare() to compare user password input with password in database 
             */
            bcrypt.compare(req.body.password, user.password).then(
                (valid) => {
                    if (!valid) {
                        return res.status(401).json({
                            error: new Error('Incorrent password!')
                        });
                    }
                    /**
                     * JSON web tokens are encoded tokens that can be used for authorization.
                     * The  jsonwebtoken  package's  sign()  method uses a secret key to encode a token 
                     * which can contain a custom payload and be valid for a limited time.
                     */
                    const token = jsonwebtoken.sign(
                        { userId: user._id }, //user id
                        'RANDOM_TOKEN_SECRET', // secret password
                        { expiresIn: '24h' }); // expiration time
                    res.status(200).json({
                        userId: user._id,
                        token: token
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