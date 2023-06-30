const mongoose = require('mongoose');
// create a schema
const postSchema = mongoose.Schema({
    title: String,
    content: String,
    image: String,
    tags: [String],
    likes: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);