
const http = require('http');
const express = require('express');
const app = express();
const PORT = 3000;
const server = http.createServer(app);

const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const blogData = [
    {
        title: 'first blog post',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos sint, excepturi soluta impedit qui laboriosam aperiam iusto recusandae quos autem enim asperiores nulla ad tempore aspernatur suscipit, illum quod dolorem!'
    },
    {
        title: 'second blog post',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos sint, excepturi soluta impedit qui laboriosam aperiam iusto recusandae quos autem enim asperiores nulla ad tempore aspernatur suscipit, illum quod dolorem!'
    },
    {
        title: 'third blog post',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos sint, excepturi soluta impedit qui laboriosam aperiam iusto recusandae quos autem enim asperiores nulla ad tempore aspernatur suscipit, illum quod dolorem!'
    }
];


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

app.get('/blog', (req, res) => {
    // const blogHTML = [];
    // for (let post of blogData) {
    //     blogHTML.push(`<h2>${post.title}</h2>`);
    //     blogHTML.push(`<p>${post.content}</p>`);
    // }
    const blogHTML = blogData.map((post) => {
        return `<h2>${post.title}</h2><p>${post.content}</p>`
    });
    console.log(blogHTML);

    res.render('blog', {
        locals: {
            blogPosts: blogData,
            pageTitle: 'Blog',
            pageHeader: 'Blog'
        },
        partials: {
            header: 'partials/header',
            nav: 'partials/nav',
            footer: 'partials/footer'
        }
    });
});

app.get('/about', (req, res) => {
    res.render('home', {
        locals: {
            pageTitle: 'About',
            pageHeader: 'About'
        },
        partials: {
            header: 'partials/header',
            nav: 'partials/nav',
            title: 'partials/title',
            footer: 'partials/footer'
        }
    })
});

server.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});