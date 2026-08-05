const Joi = require("joi");

exports.loginSchema = {
    body : Joi.object({
        email : Joi.string().email().required().messages({
            "string.empty": "Email is required",
            "string.email" : "Please provide a valid email",
        }), 
        password : Joi.string().required().messages({
            'string.empty' : "Passowrd is required"
        })
    }).strict(true)
}