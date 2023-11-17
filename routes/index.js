const express = require('express');
const router = express.Router();

// Import your existing routes
const artistRoutes = require('./artistRoutes');
const songRoutes = require('./songRoutes');

// Add the "Hello World" route
router.get('/', (req, res) => {
  res.send('Hello World!');
});

// Use the existing routes
router.use('/artists', artistRoutes);
router.use('/songs', songRoutes);

module.exports = router;
