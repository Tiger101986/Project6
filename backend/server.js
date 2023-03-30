/** 
 * import Node native http package and use it to create a server
 * by passing a function that will be executed every time a call is made to that server
 * AND set the server up to listen on either the port environment variable or port 3000 for development
*/
const http = require('http');
const app = require('./app');// import app file 

app.set('port', process.env.PORT || 3000); // set port to app file

//create http server
const server = http.createServer(app);

//server.listen(process.env.PORT || 4200);
server.listen(process.env.PORT || 3000);