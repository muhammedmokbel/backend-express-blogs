const Joi = require("joi");

exports.resetTokenSchema = {
    params : Joi.object({
        resetToken : Joi.string().required().messages({
            'string.empty' : 'resetToken is required'
        })
    }),
    body : Joi.object({
        password : Joi.string()
                .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/)
                .required()
                .messages({
                "string.empty": "Password is required.",
                "string.pattern.base":
                    "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
                "any.required": "Password is required.",
                }),
    })
}
