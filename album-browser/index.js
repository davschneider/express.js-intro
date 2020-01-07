

const http = require('http');
const express = require('express');
const app = express();

const album = require('./album');

const server = http.createServer(app);

app.get('/', (req, res) => {
    res.send("/albums to see album list. /albums/albumId# to see songs on individual album.");
})

app.get('/albums', (req, res) => {
    try {
        const albumInfo = album.getAlbums();
        for (let album of albumInfo) {
            res.write(`
            <p>
                <a href="/albums/${album.id}">
                    ${album.title} : ${album.artist}
                </a>
            </p>`);
        }
        res.end();
    } catch (e) {
        res.status(404);
        res.send('Could not find albums list.');
    }
});

app.get('/albums/:albumId', (req, res) => {
    try {
        const albumSongs = album.getSongsForAlbum(req.params.albumId);
        for (let song of albumSongs) {
            res.write(`
            <p>
                ${song.title}
            </p>`);
        }
        res.end();
    } catch (e) {
        res.status(404);
        res.send('Album not found.');
    }
});

app.get('*', (req, res) => {
    res.json("Data not found.");
});

server.listen(3000, () => {
    console.log("Listening on port 3000.");
});


