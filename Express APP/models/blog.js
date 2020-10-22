const moongoose = require('mongoose')

const Schema = moongoose.Schema; // Schemas define the structure of the document in the collection.

// Schemas are wrapped inside models, and models communicate with database collections.
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true }); // second argument is for options, in this case: add a timestamp to the document.

// Creating a model
// - moongoose.model('Blog', blogSchema);
// ^ First Argument has to be singular, mongoose will pluralize 'Blog' to 'Blogs' and search for that collection ^
// ^ Second Argument is for the Schema, which is the structure of the document ^
// const Blog = moongoose.model('Blog', blogSchema); - We can now add documents using Blog.add()

const Blog = moongoose.model('Blog', blogSchema);
module.exports = Blog;