const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags = ['Artists']
  try {
    const result = await mongodb.getDatabase().db().collection('artists').find();
    result.toArray().then((artists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(artists);
    });
  } catch (error) {
		console.log(error);
	}
};

const getById = async (req, res) => {
  //#swagger.tags = ['Artists']
  try {
  const artistId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('artists').find({ _id: artistId });
  result.toArray().then((artists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(artists[0]);
    });
  } catch (error) {
    console.log(error);
  }
};

const createArtist = async (req, res) => {
  //#swagger.tags = ['Artists']
  try {
    const artist = {
        name: req.body.name,
        genre: req.body.genre
    };
    const response = await mongodb.getDatabase().db().collection('artists').insertOne(artist);
    if (response.acknowledged) {
        res.status(204).end();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the artist');
    }
  } catch (error) {
    console.log(error);
  }
};

const updateArtist = async (req, res) => {
    //#swagger.tags = ['Artists']
  try {
    const artistId = new ObjectId(req.params.id);
    const artist = {
        name: req.body.name,
        genre: req.body.genre
    };
    const response = await mongodb.getDatabase().db().collection('artists').replaceOne({ _id: artistId }, artist);
    if (response.modifiedCount > 0) {
        res.status(204).end();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the artist');
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteArtist = async (req, res) => {
  try {
    //#swagger.tags = ['Artists']
    const artistId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('artists').deleteOne({ _id: artistId });
    if (response.deletedCount > 0) {
        res.status(204).end();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the artist');
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
    getAll,
    getById,
    createArtist,
    updateArtist,
    deleteArtist
};