// import mongoDB Atlas
const mongoose = require('mongoose');

//Create a data schema with Schema() function that contains the fields for each  Thing  , their type, and whether or not they are a required field. 
const sauceSchema = mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},
    heat: {type:Number, required: true},
    likes: {type: Number, required: true},
    dislikes: {type: Number, required: true},
    usersLiked: {type: [String], required: true},
    usersDisliked: {type: [String], required: true},
});

// Export that schema as a Mongoose model, making it available for your Express app.

module.exports = mongoose.model('Sauce', sauceSchema);