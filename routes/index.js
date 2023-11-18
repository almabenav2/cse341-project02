const router = require('express').Router();
router.use('/', require('./swagger'));

const artistRoutes = require('./artistRoutes');
const songRoutes = require('./songRoutes');

router.get('/', (req, res) => { 
  //#swagger.tags=['Hello world']
  res.send('hello world');
});

// router.get('/', (req, res) => {res.send('Hello world');});

router.use('/artists', artistRoutes);
router.use('/songs', songRoutes);

module.exports = router;
