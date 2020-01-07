
const http = require('http');
const fs = require('fs');

const express = require('express');
const app = express();

const faker = require('faker');

const server = http.createServer(app);

// app.get('/:name/:place', (req, res) => {
//     fs.readFile('madlib.html', (err, buf) => {
//         let content = buf.toString();
//         let newString = content.replace("***NAME***", req.params.name).replace("***PLACE***", req.params.place);
//         res.send(newString);
//     });
// });

app.get('/:placeholder', (req, res) => {
    res.end(faker.hacker[req.params.placeholder]());
    // res.end(`I'm calibrating the ${req.params.placeholder1}, ${req.params.placeholder2}, ${req.params.placeholder3}, ${req.params.placeholder4}`)
});

server.listen(3000);

