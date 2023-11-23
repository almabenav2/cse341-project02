const express = require('express');
const router = express.Router();
const { artistSchema } = require('../controllers/validation');

const artistController = require('../controllers/artistController');

router.get('/', artistController.getAll);

router.get('/:id', artistController.getById);

router.post('/', async (req, res, next) => {
    try {
        const result = await artistSchema.validateAsync(req.body);
        console.log(result);
        // Llama a next() para pasar al siguiente middleware (artistaController.createArtist)
        next();
    } catch (error) {
        if (error.isJoi) error.status = 422;
        // Llama a next() para manejar el error
        next(error);
    }
}, artistController.createArtist);

router.put('/:id', async (req, res, next) => {
    try {
        const result = await artistSchema.validateAsync(req.body);
        console.log(result);
        // Llama a next() para pasar al siguiente middleware (artistaController.updateArtist)
        next();
    } catch (error) {
        if (error.isJoi) error.status = 422;
        // Llama a next() para manejar el error
        next(error);
    }
}, artistController.updateArtist);

router.delete('/:id', artistController.deleteArtist);

module.exports = router;