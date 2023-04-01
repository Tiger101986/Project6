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

//import models folder 
const Thing = require('./models/thing');

const app = express();
app.use(express.json());// OR const bodyParser = require(body.parser'); app.use(bodyParser.json());

mongoose.connect('mongodb+srv://kanharob:5l0hp1ab0jFENSJ3@clusterjavascript.eeqpc6c.mongodb.net/?retryWrites=true&w=majority')
.then(() =>{
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

/**
 * add some middleware 
 * Change use() to get() and post()-- app.use('/api/sauce', (req, res, next)
 * Use save() method to save Thing from .post() user input
 * Use find() method to get all Things in Database from .get()
 * Use findOne() method to gets specific/single one Thing from .get()
 */
app.post('/api/sauces', (req, res, next) => {
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
});

// Retrieving a Specific Thing - Single sauce
app.get('/api/sauces/:id', (req, res, next) => {
    Thing.findOne({
        _id: req.params.id
    }).then((things) => {
        res.status(200).json(things);
    })
    .catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

// Retrieving a list of Thing - Array sauces
app.get('/api/sauces', (req, res, next) => {
    Thing.find().then((things) => {
        res.status(200).json(things);
    })
    .catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});
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