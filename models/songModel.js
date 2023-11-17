const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String },
  releaseDate: { type: Date },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
  // Additional song fields can be added
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
