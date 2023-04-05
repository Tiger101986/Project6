/**
 * install mongoose data validation with npm: 
 * 1- npm install --force mongoose-unique-validator -- a package that improves error messages when validating unique data.
 * 2- npm install bcrypt -- a secure encryption package.
 * 3- npm install jsonwebtoken -- verify authentication
 */
// import mongoose package
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//Create mongoose Schema for email (unique address) and password 
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: {type: String, require: true}
});

//plugin() mongoose-unique-validator Schema to make sure no two users can share the samae email address
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);