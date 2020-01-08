
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

function getAlbumById(id) {
    return albumsData.albums.find(album => album.id == id);
}

console.log(getAlbumById(1001));

module.exports = {
    getAlbums,
    getSongsForAlbum,
    getAlbumById
}
