/**
 * install Express frame work in backend folder and import express method in app.js 
 * Express app is a series of functions called middleware.
 * Each piece of middleware receives the request and response objects and can read, parse, and manipulate them as necessary.
 * Express middleware also gets the following method, which allows that middleware to pass execution on to the next piece. 
*/ 
const express = require('express');
const mongoose = require('mongoose');

/**
 * MongoDB Connection: mongodb+srv://kanharob:<password>@clusterjavascript.eeqpc6c.mongodb.net/?retryWrites=true&w=majority 
 * MongoDB Password:5l0hp1ab0jFENSJ3
 */
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
 * Change use() to get() -- app.use('/api/sauce', (req, res, next)
 */
app.post('/api/sauces', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({nessage: 'Thing created successfully'});
})

app.get('/api/sauces', (req, res, next) => {
    const stuff = [
      {
        userId: 'String - the MongoDB unique identifier for the user who created the sauce',
        name: 'String - name of the sauce',
        manufacturer: 'string - manufacturer of the sauce',
        description: 'string - description of the sauce',
        mainPepper: 'string - the main pepper ingredient in the sauce',
        imageUrl: 'String - the URL for the picture of the sauce uploaded by the user',
        heat: 'Number - a number between 1 and 10 des<cribing the sauce',
        likes: 'Number - the number of users liking the sauce',
        dislikes: 'Number - the number of users liking the sauce',
        usersLiked: '["String <userId>"] -- an array of user IDs of those who have liked the sauce',
        usersDisliked: '["String <userId>"] -- an array of user IDs of those who have disliked the sauce',
      },
    ];
    res.status(200).json(stuff);
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