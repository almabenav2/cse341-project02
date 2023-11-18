const Joi = require('@hapi/joi');

const artistSchema = Joi.object({
    name: Joi.string().required(),
    genre: Joi.string().required(),
});

const songSchema = Joi.object({
    title: Joi.string().required(),
    genre: Joi.string().required(),
    releaseDate: Joi.date(),
    artist: Joi.string().required(),
});

module.exports = { artistSchema, songSchema };
