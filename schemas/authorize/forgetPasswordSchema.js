const Joi = require("joi");


exports.forgetPasswordSchema = {
    body : Joi.object({
        email : Joi.string().email().required().messages({
            "string.empty": "Email is required",
            "string.email" : "Please provide a valid email",
        }), 
    }).strict(true)
} 