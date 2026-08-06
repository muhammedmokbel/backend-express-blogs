const Joi = require("joi");
const { objectId } = require("../JoiHelpers");


exports.deleteBlogSchema = {
    params : Joi.object({
        id : objectId().required().messages({
            'string.empty' : 'id is required'
        })
    })
    
}