const express = require('express');
const Blog = require('../models/blog');
const blogController = require('../controllers/blogController');

// Routers are like a mini app, they stand alone inside the app.
// We have to use the router inside the app.
const router = express.Router();

// MVC APPROACH WITH ROUTER - MODEL | VIEW | CONTROLLER

// Getting all the blogs from the database
router.get('/', blogController.blog_index);

// Getting POST requests from a url
router.post('/', blogController.blog_create_post);

// Route Parameters - Variables in GET requests.
router.get('/:id', blogController.blog_details);

// Getting DELETE Requests from the FetchAPI
router.delete('/:id', blogController.blog_delete);

module.exports = router;