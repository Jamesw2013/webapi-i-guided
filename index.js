const express = require('express');
const db = require('./data/hubs-model.js')
// import express from 'express';

const server = express();

server.use(express.json());

server.get('/', (request, response) => {
    response.send('hello world form express!!');
});

server.get('/now', (request, response) => {
    const now = new Date().toISOString();
    response.send(now);
})

server.get('/hubs', (request, response) => {
    db.find()
    .then(hubs => {
        response.status(200).json(hubs);
    })
    .catch(err => {
        response.status(500).json({success:false, err});
    });
})

// GET /hubs
// POST /hubs

server.post('/hubs', (request, response) => {
    //POST /hubs {name: someone}
    const hubInfo = request.body;
    console.log(hubInfo);

    db.add(hubInfo)
    .then(hub => {
        response.status(201).json({success:true, hub});
    })
    .catch(err => {
        response.status(500).json({success:false, err});
    })
});

server.delete('/hubs/:id', (request,response) => {
    // DELETE /hubs/<id>
    const {id} = request.params;

    db.remove(id)
    .then(deleted => {
        if(deleted) {
            response.status(204).end();
        } else {
            response.status(404).json({success:false, message: 'I cannot find the hub you are looking for'})
        }
    })
    .catch(err => {
        response.status(500).json({success:false, err});
    })
})

server.listen(4000, () => {
    console.log('server listening on port 4000');
})