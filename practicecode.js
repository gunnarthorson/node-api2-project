const express = require('express');
const port = 5000;
const server = express();
const userRoutes = require('./users/userRoutes')
server.use(express.json());

server.use('/users', userRoutes)

// GET IS READ DATA
server.get('/', (req, res) => {
    res.send('hello world');
})
server.get('/about', (req, res) => {
    res.status(200).send('hello this is a message for about page');
})
server.get('/hobbits', (req, res) => {
    res.send('welcome to hobbiton');
})


// POST IS CREATE DATA status 201 
server.post('/hobbits', (req, res) => {
res.status(201).json({ url: '/hobbits', operation: 'POST'})
})

//PUT IS UPDATE status 200
server.put('/hobbits', (req, res) => {
    res.status(200).json({ url: '/hobbits', operation: 'PUT'})
})


//DELETE DATA status status 204. No content for 204
server.delete('/hobbits', (req, res) => {
    res.status(204)
})

server.delete('/hobbits/:id', (req, res) => {
    const id = req.params.id;
    console.log(req.params);
    res.status(200).json({url: `/hobbits/${id}`, operation: `DELETE for hobbit with id ${id}`})
})


server.listen(port, () => {
    console.log(`server listening on port ${port}`);
})