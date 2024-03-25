const Joi = require("@hapi/joi");
const randomNumberDigit = Joi.object({
    digitNumber:Joi.string().pattern(/^[0-9]*/).error(new Error("شماره  وارد شده معتبر نمی باشد")),
})

module.exports = {
    randomNumberDigit,
    
}