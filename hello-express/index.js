
const http = require('http');
const PORT = 3000;

const express = require('express');
const app = express();

const server = http.createServer((req, res) => {

})

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
    
});