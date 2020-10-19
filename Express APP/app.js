const express = require('express');

const app = express();


// When the port is 3000, it'll automatically look for localhost. We don't need to define it.
// Listen for requests
app.listen(3000);

app.get('/', (req, res) => {
    // res.setHeader('Content-Type', 'text/html'); is not required on express apps. It automatically detects it.

    //res.send('<p>Home Page</p>') // similar to res.write()
    res.sendFile('./views/index.html', { root: __dirname }) // Second Argument is the relative path;"./views/index.html" relative to our current directory.
})

app.get('/about', (req, res) => {
    //res.send('<p>About Page</p>')
    res.sendFile('./views/about.html', { root: __dirname }) 
})

// Redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about') // similar to res.setHeader('Location', '/about'); & it automatically sets the redirect status code.
})

// 404 Error Page
// use() method will use this function if any of the request doesn't match above.
// It's like the default case in a switch case.
app.use((req, res) => {
    res.status(404).sendFile('./views/error.html', { root: __dirname }) // res.status is similar to statusCode = 404;
})