const express = require('express');

const app = express();

app.use((req, res, next) => {
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
});

module.exports = app;