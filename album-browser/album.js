
const albumsData = require('./albumsData.json');

function getAlbums() {
    return albumsData.albums
}

function getSongsForAlbum(albumId) {
    if (albumId) {
        for (let album of albumsData.albums) {
            if (album.id == albumId) {
                return album.songs
            }
        }
    } else {
        throw "Album not found";
    }
}

module.exports = {
    getAlbums,
    getSongsForAlbum
}
