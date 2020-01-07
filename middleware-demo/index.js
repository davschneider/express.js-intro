
const http = require('http');
const express = require('express');
const app = express();
const PORT = 3000;
const server = http.createServer(app);

const morgan = require('morgan');
const logger = morgan('tiny');
const helmet = require('helmet');

app.use(logger);
app.use(helmet());

// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url}`);
//     res.write(`<h1>${req.method}</h1>`);
//     next(); // send signal to express telling it 
//             // that this is middleware is done
// });

app.get('/', (req, res, next) => {
    res.write('<h1>Hooray it is the home page.</h1>');
    res.end();
    // next();
    // Be careful, because we are sending the response.
    // If the next middleware tries to send
    // the response, we will get an error.
});

server.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
});