const Joi = require("@hapi/joi");
const authSchema = Joi.object({
    email:Joi.lowercase().trim().string().email().required(),
    password:Joi.min(6).max(16).trim().string().required()
})
module.exports = {
    authSchema
}