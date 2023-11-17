const Song = require('../models/songModel');

const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find().populate('artist', 'name'); // Populate artist field with name
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createSong = async (req, res) => {
  try {
    const newSong = req.body;
    const createdSong = await Song.create(newSong);
    res.json(createdSong);
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
};

module.exports = {
  getAllSongs,
  createSong,
};