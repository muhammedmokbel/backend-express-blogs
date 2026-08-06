const Joi = require("joi");


exports.addBlogSchema = {
    body : Joi.object({
        title : Joi.string().required().min(3).max(100).messages({
            "string.empty": "Blog title is required",
            "string.min": "Blog title should be more than or equal 3 characters",
            "string.max": "Blog title should be less than or equal 100 characters",
        }) , 
        text : Joi.string().required().min(250).max(1000).messages({
            "string.empty": "Blog text is required",
            "string.min": "Blog text should be more than or equal 250 characters",
            "string.max": "Blog text should be less than or equal 1000 characters",
        }), 
 
    }).strict(true)
}