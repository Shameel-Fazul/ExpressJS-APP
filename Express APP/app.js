const express = require('express');

const app = express();

// view engine is a setting in our express app.
// we're using ejs as our app's view engine.
// It now knows we're using ejs to create our template.
app.set('view engine', 'ejs');

// express looks for the templates in a folder called 'views'.
// If your template folder has a different name, we can configure it like this : 
//app.set('views', 'myviews');


// When the port is 3000, it'll automatically look for localhost. We don't need to define it.
// Listen for requests
app.listen(3000);

app.get('/', (req, res) => {
// res.setHeader('Content-Type', 'text/html'); is not required on express apps. It automatically detects it.
//res.send('<p>Home Page</p>') // similar to res.write()
    //res.sendFile('./views/index.html', { root: __dirname }) // Second Argument is the relative path;"./views/index.html" relative to our current directory.
    
// Dynamic Template using ejs as our view engine.
// Express is going to find our 'views' folder and use the ejs view engine to render the index file and send it back to the browser.
// To pass data to the template, we add an object as the second argument.
// The data can be obtained on the template by using the property name inside the ejs syntax <%= title %>

    const blogs = [
        {title: 'The theory of everything', snippet: 'lorem ipsum'},
        {title: 'The First Empire', snippet: 'lorem ipsum'},
        {title: 'Journey to the Quantum Realm', snippet: 'lorem ipsum'}
    ];

    res.render('index', { title: 'Home', blogs });
})

app.get('/about', (req, res) => {
    //res.send('<p>About Page</p>')
    //res.sendFile('./views/about.html', { root: __dirname })
    res.render('about', { title: 'About' });
})

app.get('/blogs/create', (req, res) => {
    //res.send('<p>About Page</p>')
    //res.sendFile('./views/about.html', { root: __dirname })
    res.render('create', { title: 'Create Blog' });
})

// Redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about'); // similar to res.setHeader('Location', '/about'); & it automatically sets the redirect status code.
})

// 404 Error Page
// use() method will use this function if any of the request doesn't match above.
// It's like the default case in a switch case.
app.use((req, res) => {
    //res.status(404).sendFile('./views/error.html', { root: __dirname }) // res.status is similar to statusCode = 404;
    res.status(404).render('error', { title: 'Error 404' });
})