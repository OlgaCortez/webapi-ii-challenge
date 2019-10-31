require('dotenv').config();

const express = require('express');

const postRouter = require('./data/post-router.js');

const server = express();

server.use(express.json());

server.use('/api/posts', postRouter);

const port = process.env.PORT;

server.listen(port, () => {
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});