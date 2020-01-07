
const http = require('http');
const express = require('express');
const app = express();

const PORT = 3000;

const server = http.createServer(app);

const specialGreetings = {
    "oakley": "How wonderfully splendid it is to be in your presence again!",
    "chris": "Oh hey...",
    "milla": "Hello, "
};

app.get('/oakley', (req, res) => {
    res.send("How wonderfully splendid it is to be in your presence again!");
});

app.get('/chris', (req, res) => {
    res.send("Oh hey...");
});

app.get('/milla', (req, res) => {
    res.send("Hello, ");
});

app.get('/:url', (req, res) => {
    res.send(`Hello, ${req.params.url}!`);
});

server.listen(PORT, () => {
    console.log("Listening on 3000.");
});