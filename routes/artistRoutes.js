const express = require('express');
const router = express.Router();
const { createArtist, getAllArtists } = require('../models/artistModel');
// ... rest of the code
router.post('/', async (req, res) => {
    try {
        const newArtist = req.body;
        const result = await createArtist(newArtist);
        res.json(result.ops[0]);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Example route to get all artists
router.get('/', async (req, res) => {
    try {
        const artists = await getAllArtists();
        res.json(artists);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add more routes as needed
module.exports = router;