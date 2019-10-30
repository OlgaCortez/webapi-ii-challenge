const express = require('express');

const postRouter = require('./data/post-router.js');

const server = express();

server.use(express.json());

server.use('/api/posts', postRouter);

server.listen(5000, () => {
    console.log('\n*** Server Running on http://localhost:5000 ***\n');
});