const Joi = require("@hapi/joi");
const { MongoIDPattern } = require("../constant/constantVar");
const createHttpError = require("http-errors");
const ObjectIdSchema = Joi.object({
    id: Joi.string().pattern(MongoIDPattern).error(createHttpError.BadRequest(" شناسه وارد شده صحیح نمیباشد")),
})
module.exports ={
    ObjectIdSchema
}