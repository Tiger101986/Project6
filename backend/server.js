/** 
 * import Node native http package and use it to create a server
 * by passing a function that will be executed every time a call is made to that server
 * AND set the server up to listen on either the port environment variable or port 3000 for development
*/
const http = require('http');
const app = require('./app');// import app file 

//Adding port normalization, error handling and basic logging 
//to your Node server makes app run more consistently and easier to debug.
// Port validation function provide port as number or a string
const normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)){
        return val;
    }
    if (port >= 0){
        return port;
    }
    return false;
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// set port to app file app.set('port', process.env.PORT || 3000); 

// Check for various errors and handle them to register to the server
const errorHandler = error => {
    if (error.syscall != 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe' + address : 'port:' + port;
    switch (error.code){
        case 'EACCES' :
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE' :
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;        
    }
};

//create http server
const server = http.createServer(app);

//turn on server with error and listening event
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe' + address : 'port' + port;
    console.log('listening on' + bind);
});

server.listen(port);

//server.listen(process.env.PORT || 3000);
//server.listen(process.env.PORT || 3000);