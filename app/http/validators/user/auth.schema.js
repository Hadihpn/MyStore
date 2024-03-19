const Joi = require("@hapi/joi");
const getOTPSchema = Joi.object({
    phone:Joi.string().pattern(/^(\+98|0)?9\d{9}$/).error(new Error("شماره موبایل وارد شده معتبر نمی باشد")),
})
const checkOTPSchema = Joi.object({
    phone:Joi.string().pattern(/^(\+98|0)?9\d{9}$/).error(new Error("شماره موبایل وارد شده معتبر نمی باشد")),
    code: Joi.string().pattern(/\d{5}$/).error(new Error("کد وارد شده معتبر نمی باشد"))
})
module.exports = {
    getOTPSchema,
    checkOTPSchema
}