const Joi = require("joi");

exports.signupSchema = {
    body: Joi.object({
        firstName: Joi.string().required().min(1).max(250).messages({
            "string.empty": "First Name is required",
            "string.min": "First Name should be more than or equal 1 characters",
            "string.max": "First Name should be less than or equal 250 characters",
        }),
        lastName : Joi.string().required().min(1).max(250).messages({
            "string.empty": "Last Name is required",
            "string.min": "Last Name should be more than or equal 1 characters",
            "string.max": "Last Name should be less than or equal 250 characters",
        }), 
        email : Joi.string().email().required().messages({
            "string.empty": "Email is required",
            "string.email" : "Please provide a valid email",
        }), 
        password : Joi.string()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/)
        .required()
        .messages({
        "string.empty": "Password is required.",
        "string.pattern.base":
            "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        "any.required": "Password is required.",
        }),
        passwordConfirm : Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.only": "Passwords didn't match",
      }),
      acceptTerms : Joi.boolean().required().valid(true) .messages({
      "any.only": "You must accept the terms and conditions.",
      "any.required": "Accepting the terms and conditions is required.",
    })

    }).strict(true)
}