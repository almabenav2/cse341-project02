const Artist = require('../models/artistModel');

const getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find();
    res.json(artists);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createArtist = async (req, res) => {
  try {
    const newArtist = req.body;
    const createdArtist = await Artist.create(newArtist);
    res.json(createdArtist);
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
};

module.exports = {
  getAllArtists,
  createArtist,
};