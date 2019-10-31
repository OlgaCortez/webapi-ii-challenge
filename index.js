require('dotenv').config();

const express = require('express');

const postRouter = require('./data/post-router.js');

const server = express();

server.use(express.json());

const router = require("express").Router();

const Post = require("./db.js");

//GETS ALL POSTS
router.get("/", (req, res) => {
    Post.find()
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch(err => {
        console.log("error", err);
        res
          .status(500)
          .json({ error: "The posts information could not be retireved." });
      });
  });

server.use('/api/posts', postRouter);

const port = process.env.PORT;

server.listen(port, () => {
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});

module.exports = router;