const Joi = require("joi");

exports.verifySchema = {
    params : Joi.object({
        verifyToken : Joi.string().required().messages({
            'string.empty' : 'verify token is required.'
        })
    }).strict(true)
}