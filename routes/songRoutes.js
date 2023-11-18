const express = require('express');
const router = express.Router();
const { songsSchema } = require('../controllers/validation');

const songsController = require('../controllers/songController');

router.get('/', songsController.getAll);

router.get('/:id', songsController.getById);

router.post('/', async (req, res, next) => {
    try {
        const result = await songsSchema.validateAsync(req.body);
        console.log(result);
    } catch (error) {
        if (error.isJoi) error.status = 422;
        next(error);
    }
}, songsController.createSong);

router.put('/:id', async (req, res, next) => {
    try {
        const result = await songsSchema.validateAsync(req.body);
        console.log(result);
    } catch (error) {
        if (error.isJoi) error.status = 422;
        next(error);
    }
}, songsController.updateSong);

router.delete('/:id', songsController.deleteSong);

module.exports = router;