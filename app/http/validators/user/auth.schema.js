const Joi = require("@hapi/joi");
const authSchema = Joi.object({
    mobile:Joi.string().pattern('^(\\+98|0)?9\\d{9}$').error(new Error("شماره موبایل وارد شده معتبر نمی باشد")),
})
module.exports = {
    authSchema
}