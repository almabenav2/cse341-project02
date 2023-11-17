const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: String },
  // Additional artist fields can be added
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;

