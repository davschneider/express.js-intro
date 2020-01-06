const http = require('http');
const express = require('express');
const app = express();

const server = http.createServer(app);

app.get('/', (req, res) => {
    // res.send() the home page
});

app.get('/albums', (req, res) => {
    // res.send() the list of albums
});

app.get('/albums/:albumId', (req, res) => {
    console.log(albumId);
    // res.send() a single album
});

server.listen(3000);