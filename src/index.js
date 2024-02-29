const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const server = express();
server.use(cors());
const port = 4000;
server.use(express.json());

async function getDB() {
  const dataBase = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'r00t',
    database: 'music',
  });
  await dataBase.connect();
  return dataBase;
}

server.listen(port, () => {
  console.log(`El servidor se esta ejecutando en el puerto ${port}`);
});

server.get('/getalbums', async (req, res) => {
  try {
    const conex = await getDB();
    const sql = 'SELECT * FROM albums';
    const [resultAlbums] = await conex.query(sql);

    if (resultAlbums.length > 0) {
      res.status(200).json({
        success: true,
        albums: resultAlbums,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'There are no albums in the database.',
      });
    }
  } catch (error) {
    console.error('Error fetching albums:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    });
  } finally {
    conex.end();
  }
  
});

server.post('/addalbum', async (req, res) => {
  const conex = await getDB();
  try {
    let genreId, artistId;

    const checkGenre = `SELECT * FROM genres WHERE genre_name = ?`;
    const [genreExists] = await conex.query(checkGenre, [req.body.genre]);
    if (!genreExists || genreExists.length === 0) {
      const insertGenre = 'INSERT INTO genres (genre_name) values (?)';
      const [resultGenre] = await conex.query(insertGenre, [req.body.genre]);
      genreId = resultGenre.insertId;
    } else {
      const existingGenre = genreExists[0];
      genreId = existingGenre.genre_id;
    }
    const checkArtist = `SELECT * FROM artists WHERE artist_name = ?`;
    const [artistExists] = await conex.query(checkArtist, [
      req.body.artist_name,
    ]);
    if (!artistExists || artistExists.length === 0) {
      const insertArtist =
        'INSERT INTO artists (artist_name, origin, debut_year, fk_genre_id) values (?,?,?,?)';
      const [resultArtist] = await conex.query(insertArtist, [
        req.body.artist_name,
        req.body.origin,
        req.body.debut_year,
        genreId,
      ]);
      artistId = resultArtist.insertId;
    } else {
      const existingArtist = artistExists[0];
      artistId = existingArtist.artist_id;
    }
    const checkAlbum = `SELECT * FROM albums WHERE album_title = ?`;
    const [albumExists] = await conex.query(checkAlbum, [req.body.album_title]);
    if (!albumExists || albumExists.length === 0) {
      const insertAlbum =
        'INSERT INTO albums (album_title, release_year, fk_artist_id, fk_genre_id) values (?,?,?,?)';
      const [resultAlbum] = await conex.query(insertAlbum, [
        req.body.album_title,
        req.body.release_year,
        artistId,
        genreId,
      ]);
      conex.end();
      res.status(200).json({
        success: true,
        message: 'Album added successfully to the database.',
      });
    } else {
      conex.end();
      res.status(409).json({
        success: false,
        message: 'Album already exists in the database.',
      });
    }
  } catch (error) {
    console.error('Error adding album:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  } finally {
    conex.end();
  }
});

// server.get('/byartist', async (req, res) => {
//     const conex = await getDB();

// });

server.delete('/deletealbum', async (req, res) => {
  const conex = await getDB();
  try {
    const deleteAlbum = `DELETE FROM albums WHERE album_title = ?`;
    const [albumExists] = await conex.query(deleteAlbum, [
      req.body.album_title,
    ]);
    if (albumExists.affectedRows > 0) {
      conex.end();
      res.status(200).json({
        success: true,
        message: 'Album successfully deleted from the database.',
      });
    } else {
      conex.end();
      res.status(404).json({
        success: false,
        message: `Album doesn't exist in the database`,
      });
    }
  } catch (error) {
    console.error('Error deleting album:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  } finally {
    conex.end();
  }
});

const staticServer = './public-react';
server.use(express.static(staticServer));
