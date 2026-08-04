const Joi = require("joi");

const listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required().min(3),
        description: Joi.string().required().min(4),
        price: Joi.number().required().min(0),
        country: Joi.string().required().min(3),
        location: Joi.string().required().min(4),
        image: Joi.string().allow("",null),
        
    }).required(),
});

module.exports = listingSchema;