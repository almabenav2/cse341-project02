const express = require('express');
const router = express.Router();
const { songSchema } = require('../controllers/validation');

const songController = require('../controllers/songController');

router.get('/', songController.getAll);

router.get('/:id', songController.getById);

router.post('/', async (req, res, next) => {
    try {
        const result = await songSchema.validateAsync(req.body);
        console.log(result);
        next();
    } catch (error) {
        if (error.isJoi) error.status = 422;
        next(error);
    }
}, songController.createSong);

router.put('/:id', async (req, res, next) => {
    try {
        const result = await songSchema.validateAsync(req.body);
        console.log(result);
        next();
    } catch (error) {
        if (error.isJoi) error.status = 422;
        next(error);
    }
}, songController.updateSong);

router.delete('/:id', songController.deleteSong);

module.exports = router;