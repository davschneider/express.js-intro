

const http = require('http');
const express = require('express');
const app = express();
const album = require('./album');

const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const server = http.createServer(app);

app.get('/', (req, res) => {
    res.send("/albums to see album list. /albums/albumId# to see songs on individual album.");
})

app.get('/albums', (req, res) => {
    const albumData = album.getAlbums();
    const albumHTML = albumData.map((album) => {
        return `<h2><a href='/albums/${album.id}'>${album.artist}: ${album.title}</a></h2>`
    }).join('');
    try {
        res.render('albums', {
            locals: {
                pageTitle: 'Album List',
                albums: albumHTML
            },
            partials: {
                header: 'partials/header',
                pageHeader: 'partials/pageHeader',
                footer: 'partials/footer'
            }
        })
    } catch (e) {
        res.status(404);
        res.send('Could not find albums list.');
    }
});

app.get('/albums/:albumId', (req, res) => {
    try {
        const albumSongs = album.getSongsForAlbum(req.params.albumId);
        const songsHTML = albumSongs.map((song) => {
            return `<p>${song.title}</p>`;
        }).join('');
        const albumTitle = `<h2>Album Name: ${album.getAlbumById(req.params.albumId).title}</h2>`;
        res.render('songs', {
            locals: {
                pageTitle: 'Songs List',
                songList: songsHTML,
                albumTitle
            },
            partials: {
                header: 'partials/header',
                pageHeader: 'partials/pageHeader',
                footer: 'partials/footer'
            }
        })
    } catch (e) {
        res.status(404);
        res.end('Data not found.');
    }
});

app.get('*', (req, res) => {
    res.json("Data not found.");
});

server.listen(3000, () => {
    console.log("Listening on port 3000.");
});


