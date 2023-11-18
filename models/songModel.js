const { getDatabase } = require('../data/database');

const songCollection = () => getDatabase().collection('songs');

const createSong = async (song) => {
    return songCollection().insertOne(song);
};

const getAllSongs = async () => {
    return songCollection().find({}).toArray();
};

module.exports = {
    createSong,
    getAllSongs,
    // Add more methods as needed
};