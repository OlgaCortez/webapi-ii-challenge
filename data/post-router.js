const router = require('express').Router();

const Post = require('./db.js');

//CREATES NEW POST
router.post('/', (req, res) => {
    const {title, contents} = req.body;
    console.log(req.body);
    if(!title || !contents) {
        res.status(400).json({errorMessage: "Please provide title and contents for the post."});
    } else {
        Post.insert({title, contents})
        .then(({id}) => {
            Post.findById(id)
        .then(posts => {
            res.status(201).json(posts);
        })
        .catch(err => {
            console.log('error', err);
            res.status(500).json({error: "There was an error while saving the post to the database."});
            });
        });
    }
});

//CREATES A COMMENT FOR POST
router.post('/:id/comments', (req, res) => {
    const comment = req.body;
    console.log(req.body);
    if(!comment.post_id) {
        res.status(404).json({message: "The post with the specified ID does not exist."});
    } else if (!comment.text) {
        res.status(400).json({ errorMessage: "Please provide text for the comment." });
    } else if (comment.post_id && comment.text) {
        Post.insertComment(comment)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            console.log('error', err)
            res.status(500).json({error: "There was an error while saving the comment to the database"});
        });
    }
});

//GETS ALL POSTS
router.get('/', (req, res) => {
    Post.find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        console.log('error', err);
        res.status(500).json({error: "The posts information could not be retireved."});
    });
});

//GET BY POST ID #
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
    .then(posts => {
        if (posts) {
            res.status(200).json(posts);
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist."});
        }
    })
    .catch(err => {
        console.log('error', err);
        res.status(500).json({error: "The post information could not be retrieved."});
    });
});

//GET POST BY COMMENT
router.get('/:id/comments', (req, res) => {
    Post.findCommentById(req.params.id)
    .then(comments => {
        if (comments) {
        res.status(200).json(comments);
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist"});
        }
    })
    .catch(err => {
        console.log('error', err);
        res.status(500).json({error: "The comments information could not be retrieved."});
    });
});

//DELETES POST 
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    Post.remove(id)
    .then(deleted => {
        console.log(deleted);
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist."});
        }
    })
    .catch(err => {
        console.log('error', err);
        res.status(500).json({error: "The post could not be removed."});
    });
});

//UPDATES A POST
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const {title, contents} = req.body;
    if (!title && !contents) {
        return res.status(400).json({errorMessage: "Please provide title and contents for post."});
    }
    Post.update(id, {title, contents})
    .then(updated => {
        if (updated) {
            Post.findById(id)
            .then(posts => res.status(200).json(posts))
            .catch(err => {
                console.log("error", err);
                res.status(404).json({message: "The post with the specified ID does not exist."});
            });
        }
    })
    .catch(err => {
        console.log("error", err);
        res.status(500).json({error: "The post information could not be modified."});
    });
});

module.exports = router;