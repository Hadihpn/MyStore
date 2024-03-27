const Joi = require("@hapi/joi");
const { MongoIDPattern } = require("../../constant/constantVar");
const addCategorySchema = Joi.object({
    title:Joi.string().min(3).max(20).error(new Error("عنوان  وارد شده معتبر نمی باشد")),
    slug:Joi.string().min(3).max(20).error(new Error("اسلاگ  وارد شده معتبر نمی باشد")),
    icon:Joi.string().min(3).max(20).error(new Error("ایکون  وارد شده معتبر نمی باشد")),
    parent:Joi.string().allow('').pattern(MongoIDPattern).allow('').error(new Error("ادرس دسته بندی پدر معتبر نمی باشد")),
    
})
const updateCategorySchema = Joi.object({
    title:Joi.string().min(3).max(20).error(new Error("عنوان  وارد شده معتبر نمی باشد")),
})
module.exports = {
    addCategorySchema,
    updateCategorySchema
}