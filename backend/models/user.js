// import mongoose package and mongoos-unique-validator
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//Create mongoose Schema for email (unique address) and password 
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: {type: String, require: true}
});

//plugin() mongoose-unique-validator Schema to make sure no two users can share the same email address
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);