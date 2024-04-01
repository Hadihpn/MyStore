const Joi = require("@hapi/joi");
const { MongoIDPattern } = require("../../constant/constantVar");
const createHttpError = require("http-errors");
const addCategorySchema = Joi.object({
    title:Joi.string().min(3).max(20).error(createHttpError.BadRequest("عنوان  وارد شده معتبر نمی باشد")),
    slug:Joi.string().min(3).max(20).error(createHttpError.BadRequest("اسلاگ  وارد شده معتبر نمی باشد")),
    icon:Joi.string().min(3).max(20).error(createHttpError.BadRequest("ایکون  وارد شده معتبر نمی باشد")),
    parent:Joi.string().allow('').pattern(MongoIDPattern).allow('').error(createHttpError.BadRequest("ادرس دسته بندی پدر معتبر نمی باشد")),
    
})
const updateCategorySchema = Joi.object({
    title:Joi.string().min(3).max(20).error(createHttpError.BadRequest("عنوان  وارد شده معتبر نمی باشد")),
})
module.exports = {
    addCategorySchema,
    updateCategorySchema
}