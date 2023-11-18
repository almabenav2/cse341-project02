const { getDatabase } = require('../data/database');

const artistCollection = () => getDatabase().collection('artists');

const createArtist = async (artist) => {
    return artistCollection().insertOne(artist);
};

const getAllArtists = async () => {
    return artistCollection().find({}).toArray();
};

module.exports = {
    createArtist,
    getAllArtists,
    // Add more methods as needed
};