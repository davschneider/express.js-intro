
const http = require('http');
const express = require('express');
const app = express();
const PORT = 3000;
const server = http.createServer(app);

const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

app.get('/', (req, res) => {
    res.render('home', {
        locals: {
            pageTitle: 'The Home Page',
            pageHeader: 'Welcome to the Home Page'
        },
        partials: {
            header: 'partials/header',
            nav: 'partials/nav',
            title: 'partials/title',
            footer: 'partials/footer'
        }
    });
});

server.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});