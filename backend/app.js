/**
 * install Express frame work in backend folder and import express method in app.js 
 * Express app is a series of functions called middleware.
 * Each piece of middleware receives the request and response objects and can read, parse, and manipulate them as necessary.
 * Express middleware also gets the following method, which allows that middleware to pass execution on to the next piece. 
*/
const express = require('express');

/**
 * Mongoose is a handy package for interacting with a MongoDB database. It can handle:
 * Data validation.
 * Relationships between documents.
 * Direct communication with the database for reading and writing documents.
 * This allows you to overcome many of the obstacles and objections people have concerning NoSQL databases,
 * meaning you can use your JavaScript knowledge to manage an even more functional database! 
 */

/**
 * MongoDB Connection: mongodb+srv://kanharob:<password>@clusterjavascript.eeqpc6c.mongodb.net/?retryWrites=true&w=majority 
 * MongoDB Password:5l0hp1ab0jFENSJ3
 */
const mongoose = require('mongoose');

//import sauces routes 
const sauceRoutes = require('./routes/sauces');

// import user route
const userRoutes = require('./routes/user');

const app = express();
app.use(express.json());// OR const bodyParser = require(body.parser'); app.use(bodyParser.json());

mongoose.connect('mongodb+srv://kanharob:5l0hp1ab0jFENSJ3@clusterjavascript.eeqpc6c.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('successfully connected to MongoDB Atlas!');
    })
    .catch((error) => {
        console.log('unable to connect to MongoDB Atlas!');
        console.error(error);
    })


/**
 * CORS stands for cross-origin resource sharing.
 * It is a standard that allows you to relax default security rules that prevent HTTP calls between servers.
 * You want your two origins: localhost:3000 and localhost:4200, to communicate with each other
 */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/sauces',sauceRoutes);
app.use('/api/authentication', userRoutes);
    

/* app.use((req, res, next) => {
    console.log('Request received');
    next;
});
app.use((req, res, next) => {
    res.status(201);
    next;
});
app.use((req, res) => {
    res.json({message: 'your request was successful'});
    next;
});
app.use((req, res, next) => {
    console.log('Response sent successfullly!');
}); */

module.exports = app;