const Joi = require('@hapi/joi');

const artistSchema = Joi.object({
    name: Joi.string().required(),
    genre: Joi.string().required(),
    // Puedes agregar más validaciones según sea necesario
});

const songSchema = Joi.object({
    title: Joi.string().required(),
    genre: Joi.string().required(),
    releaseDate: Joi.date(),
    artist: Joi.string().required(),
    // Puedes agregar más validaciones según sea necesario
});

module.exports = { artistSchema, songSchema };
