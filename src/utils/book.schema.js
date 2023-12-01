// Validation Schemas.
const Joi = require('joi');

const schemas = {
    bookPost: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        published: Joi.boolean().required(),
    }),
    bookUpdate: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string(),
        published: Joi.boolean(),
    }),
};

module.exports = schemas