const Joi = require("joi")
const { default: mongoose } = require("mongoose")


exports.objectId = () => 
     Joi.string().custom((value,helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value))
            return helpers.message('"id" must be a valid MongoDB ObjectId');

        return value; 

    })
