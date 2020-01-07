

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
    // console.log(albumData);
    const albumHTML = albumData.map((album) => {
        return `<h2><a href='/albums/${album.id}'>${album.artist}: ${album.title}</a></h2>`
    }).join('');
    // console.log(albumHTML);
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
        // const albumInfo = album.getAlbums();
        // for (let album of albumInfo) {
        //     res.write(`
        //     <p>
        //         <a href="/albums/${album.id}">
        //             ${album.title} : ${album.artist}
        //         </a>
        //     </p>`);
        // }
        // res.end();
    } catch (e) {
        res.status(404);
        res.send('Could not find albums list.');
    }
});

app.get('/albums/:albumId', (req, res) => {
    try {
        const albumSongs = album.getSongsForAlbum(req.params.albumId);
        // console.log(albumSongs);
        const songsHTML = albumSongs.map((song) => {
            return `<p>${song.title}</p>`;
        }).join('');
        res.render('songs', {
            locals: {
                pageTitle: 'Songs on Album:',
                songList: songsHTML
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
    // try {
    //     const albumSongs = album.getSongsForAlbum(req.params.albumId);
    //     for (let song of albumSongs) {
    //         res.write(`
    //         <p>
    //             ${song.title}
    //         </p>`);
    //     }
    //     res.end();
    // } catch (e) {
    //     res.status(404);
    //     res.send('Album not found.');
    // }
});

app.get('*', (req, res) => {
    res.json("Data not found.");
});

server.listen(3000, () => {
    console.log("Listening on port 3000.");
});


