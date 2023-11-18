const express = require('express');
const router = express.Router();
const { createSong, getAllSongs } = require('../models/songModel');

// Example route to create a song
router.post('/', async (req, res) => {
    try {
        const newSong = req.body;
        const result = await createSong(newSong);
        res.json(result.ops[0]);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Example route to get all songs
router.get('/', async (req, res) => {
    try {
        const songs = await getAllSongs();
        res.json(songs);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add more routes as needed
module.exports = router;