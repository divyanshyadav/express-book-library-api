const Joi = require('joi');

const validateBook = (book) => {
    const schema = {
        name: Joi.string()
            .min(3)
            .required(),
        author: Joi.string()
            .max(50)
            .required(),
        description: Joi.string()
            .max(50)
            .default(''),
        count: Joi.number().default(0),
    };

    return Joi.validate(book, schema);
};

module.exports = {
    validateBook,
};
