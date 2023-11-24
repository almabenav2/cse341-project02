const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));
router.use('/artists', require('./artistRoutes'));
router.use('/songs', require('./songRoutes'));

router.get('/', (req, res) => { 
  //#swagger.tags=['Hello world']
  res.send('hello world');
});

router.get('/login', passport.authenticate('github'), (req, res) => {});
router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) {return next(err);}
    res.redirect('/');
  });  
});

module.exports = router;