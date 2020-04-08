const express = require('express');
const server = express();
const postsRouter = require('./routes/PostRoutes');
const port = 8000;

server.use(express.json());
server.use('/api/posts', postsRouter)


server.listen(8000, () => {
    console.log(`listening on port ${port}`);
})