const express = require('express');
const router = express.Router();
const Post = require('./models/Post');

// get all posts
router.get('/posts', async (req, res) => {
    const posts = await Post.find();
    res.send(posts);
});
 
// // post blog post
router.post('/posts', async (req, res) => { 
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    });
    await post.save();
    res.send(post);
});

// get single post by id
router.get("/posts/:id", async (req, res) => {
	try {
		const post = await Post.findOne({ _id: req.params.id })
		res.send(post)
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})

router.get('/posts/:title', async (req, res) => {
    try {
        const post = await Post.findOne({ title: req.params.title })
        res.send(post)
    } catch {
        res.status(404)
        res.send({ error: "Post doesn't exist!" })
    }
});

// update post by id
router.patch("/posts/:id", async (req, res) => { 
    try {
        // find post by id and store in post variable
        const post = await Post.findOne({ _id: req.params.id })

        if (req.body.title) {
            post.title = req.body.title
        }

        if (req.body.content) {
            post.content = req.body.content
        }

        if (req.body.image) {
            post.image = req.body.image
        }

        if (req.body.tags) {
            post.tags = post.tags.concat(req.body.tags)
        }

        await post.save()
        res.send(post)
    } catch {
        res.status(404)
        res.send({ error: "Post doesn't exist!" })
    }
});

// delete post by id
router.delete("/posts/:id", async (req, res) => { 
    try {
        await Post.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Post doesn't exist!" })
    }
});

module.exports = router;
