const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['Songs']
  try {
    const result = await mongodb.getDatabase().db().collection('songs').find();
    result.toArray().then((songs) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(songs);
    });
  } catch (error) {
    console.log(error);
  }
};

const getByArtistId = async (req, res) => {
  //#swagger.tags = ['Songs']
  try {
    const artistId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('songs').find({ artist_id: artistId });
    result.toArray().then((songs) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(songs);
    });
  } catch (error) {
    console.log(error);
  }
};

const getById = async (req, res) => {
    //#swagger.tags = ['Songs']
  try {
    const songId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('songs').find({ _id: songId });
    result.toArray().then((songs) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(songs[0]);
    });
  } catch (error) {
    console.log(error);
  }
};

const createSong = async (req, res) => {
    //#swagger.tags = ['Songs']
  try {
    const song = {
        title: req.body.title,
        genre: req.body.genre,
        releaseDate: req.body.releaseDate,
        artist: req.body.artist
    };
    const response = await mongodb.getDatabase().db().collection('songs').insertOne(song);
    if(response.acknowledged) {
        res.status(204).end();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the song');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateSong = async (req, res) => {
    //#swagger.tags = ['Songs']
  try {
    const songId = new ObjectId(req.params.id);
    const song = {
        title: req.body.title,
        genre: req.body.genre,
        releaseDate: req.body.releaseDate,
        artist: req.body.artist
    };
    const response = await mongodb.getDatabase().db().collection('songs').replaceOne({ _id: songId }, song);
    if(response.modifiedCount > 0) {
        res.status(204).end();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the song');
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteSong = async (req, res) => {
    //#swagger.tags = ['Songs']
  try {

    const songId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('songs').deleteOne({ _id: songId });
    if(response.deletedCount > 0) {
        res.status(204).end();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the song');
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
    getAll,
    getByArtistId,
    getById,
    createSong,
    updateSong,
    deleteSong
};