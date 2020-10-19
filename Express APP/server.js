const http = require('http');
const fs = require('fs');
const _ = require('lodash');

// Creates a local server with your local IP and port 3000
// Port 3000 is used for local development servers.
// Each IP is unique to a machine/server, and ports are used to identify the request type on a machine/server.
// HTTP Port : 80 | Local Developmnet Server Port : 3000

const server = http.createServer((req, res) => {
    // Lodash Methods

    // Random Number
    const num = _.random(0, 20);
    console.log(num);

    //Invoke function once method
    const greet = _.once((name) => {
        console.log('hello, ' + name);
    })
    greet('shameel');
    greet('shameel two')


    res.setHeader('Content-Type', 'text/html');
    
    let path = './views/';

    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;

        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;

        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            break;
        
        default:
            path += 'error.html';
            res.statusCode = 404;
            break;
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log('File Error : ' + err);
            res.end();
        } else {
            //res.write(data);
            res.end(data); // You can also use this instead of res.write(data);
        }
    })



    // console.log('request made');
    // console.log(req.url,  req.method);
    //res.setHeader('Content-Type', 'text/plain'); // Response file type; .json, .html, (In this case, plain text) 
    // res.write('Hello, Shameel'); // Responding as plain text
    // res.end(); // End the process and send the response.
});

server.listen(3000,'localhost', () => {
    console.log('listening for requests on port 3000');
});