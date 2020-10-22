const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose'); // Object Document Mapping Library - which wraps the MongoDB API.
                                      // Third-Party Library to interact with our MongoDB database.

const Blog = require('./models/blog');
const app = express();

// connect to MongoDB
const dbURI = '';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }) // second argument is to avoid deprecated warnings.
    .then((result) => { // mongoose.connect() is asynchronous, so we can tackle the .then() method.
        console.log('connected to MongoDB');
        app.listen(3000); // Listen to requests after the server is connected to MongoDB.
    })
    .catch((err) => { console.log(err) })


// view engine is a setting in our express app.
// we're using ejs as our app's view engine.
// It now knows we're using ejs to create our template.
app.set('view engine', 'ejs');

// express looks for the templates in a folder called 'views'.
// If your template folder has a different name, we can configure it like this : 
//app.set('views', 'myviews');


// When the port is 3000, it'll automatically look for localhost. We don't need to define it.
// Listen for requests
//app.listen(3000);

// Middleware - code that runs between a request and response.
// next function tells the server to move on to the next task after this is completed.
// If the next function isn't declared, node will return the top function and stop the process entirely.
// app.use((req, res, next) => {
//     console.log('new request made:');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next();
// });

// app.use((req, res, next) => {
//     console.log('in the next middleware');
//     next();
// });


// Middleware that comes with express.
// Files on the server are private unless they're set to be rendered to the browser
// Due to this, files like our .css file are private and can't be accessed by the html file rendered to the browser.
// There is a middleware to create a public folder, and all files in it can be accessed publicly by the templates.
// We can now load up our styles.css from the templates.
// When a template wants to load up a static file like styles, express will automatically look inside the public folder.
app.use(express.static('public'));

app.use(morgan('dev')); //Third-Party Middleware for better loggings.


// mongoose and mongo sandbox routes

// Add a blog
app.get('/add-blog', (req, res) => {
    const blog = new Blog({ // creating a new instance
        title: 'Our Neighboring Galaxy',
        snippet: 'andromeda is coming',
        body: 'more about andromeda is coming'
    });
    blog.save() // save document in the databse
     .then((result) => { // blog.save() is asynchronous, so we can tackle the .then() method.
        res.send(result);
     })
     .catch((err) => {
         console.log(err);
     })
});

// Get all blogs
app.get('/all-blogs', (req, res) => {
    Blog.find() // Finds all the documents inside the Blogs collection 
     .then((result) => { // Blog.find() is asynchronous, so we can tackle the .then() method.
         res.send(result);
     })
     .catch((err) => {
        console.log(err);
    })
});

// Find single blog by ID
// IDs aren't stored as strings in the collection.
// ^ Moongoose converts them to string back and forth ^
app.get('/single-blog', (req, res) => {
    Blog.findById('5f9166536a137b0f9ca20411')
     .then((result) => {
         res.send(result);
     })
     .catch((err) => {
        console.log(err);
    })
});

app.get('/', (req, res) => {
// res.setHeader('Content-Type', 'text/html'); is not required on express apps. It automatically detects it.
//res.send('<p>Home Page</p>') // similar to res.write()
    //res.sendFile('./views/index.html', { root: __dirname }) // Second Argument is the relative path;"./views/index.html" relative to our current directory.
    
// Dynamic Template using ejs as our view engine.
// Express is going to find our 'views' folder and use the ejs view engine to render the index file and send it back to the browser.
// To pass data to the template, we add an object as the second argument.
// The data can be obtained on the template by using the property name inside the ejs syntax <%= title %>

    // const blogs = [
    //     {title: 'The theory of everything', snippet: 'lorem ipsum'},
    //     {title: 'The First Empire', snippet: 'lorem ipsum'},
    //     {title: 'Journey to the Quantum Realm', snippet: 'lorem ipsum'}
    // ];

    // res.render('index', { title: 'Home', blogs });

    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    //res.send('<p>About Page</p>')
    //res.sendFile('./views/about.html', { root: __dirname })
    res.render('about', { title: 'About' });
});

// Find all blogs
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 }) // Finds all the documents inside the Blogs collection and sort descending order.
     .then((result) => { // Blog.find() is asynchronous, so we can tackle the .then() method.
         res.render('index', { title: 'All Blogs', blogs: result });
     })
     .catch((err) => {
        console.log(err);
    })
});

app.get('/blogs/create', (req, res) => {
    //res.send('<p>About Page</p>')
    //res.sendFile('./views/about.html', { root: __dirname })
    res.render('create', { title: 'Create Blog' });
});

// Redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about'); // similar to res.setHeader('Location', '/about'); & it automatically sets the redirect status code.
});

// 404 Error Page
// use() method will use this function if any of the request doesn't match above.
// It's like the default case in a switch case.
app.use((req, res) => {
    //res.status(404).sendFile('./views/error.html', { root: __dirname }) // res.status is similar to statusCode = 404;
    res.status(404).render('error', { title: 'Error 404' });
});
