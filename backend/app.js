/**
 * install Express frame work in backend folder and import express method in app.js 
  
*/
const express = require('express');

/**
 * MongoDB Connection: mongodb+srv://kanharob:<password>@clusterjavascript.eeqpc6c.mongodb.net/?retryWrites=true&w=majority 
 * MongoDB Password:5l0hp1ab0jFENSJ3
 */
const mongoose = require('mongoose'); //import mongoose
const path = require('path');//import path

const sauceRoutes = require('./routes/sauces'); //import sauces routes 

const userRoutes = require('./routes/user'); //import user route

const app = express();
app.use(express.json());

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@clusterjavascript.eeqpc6c.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        console.log('successfully connected to MongoDB Atlas!');
    })
    .catch((error) => {
        console.log('unable to connect to MongoDB Atlas!');
        console.error(error);
    })


//Set up headers with CORS (cross-origin resource sharing) 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));  
app.use('/api/sauces',sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;