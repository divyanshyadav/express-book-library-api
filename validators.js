const Joi = require('joi');

const validateCourse = (course) => {
    const schema = {
        name: Joi.string()
            .min(3)
            .required(),
    };

    return Joi.validate(course, schema);
};

module.exports = {
    validateCourse,
};
