const Joi = require("@hapi/joi");
const { MongoIDPattern } = require("../../constant/constantVar");
const createBlogSchema = Joi.object({
    author: Joi.string().pattern(MongoIDPattern).error(new Error("نویسنده را بدرستی انتخاب نمایید")),
    title: Joi.string().min(3).max(30).error(new Error("عنوان دسته بندی صحیح نمیباشد")),
    short_text: Joi.string().min(3).max(30).error(new Error("خلاصه متن وارد شده صحیح نمیباشد")),
    text: Joi.string().error(new Error("متن وارد شده صحیح نمیباشد")),
    tags: Joi.array().min(0).max(20).error(new Error("برچسب ها نمیتواند بیش از 20 ایتم باشد")),
    category: Joi.string().pattern(MongoIDPattern).error(new Error(" دسته بندی وارد شده صحیح نمیباشد")),
})
module.exports = {
    createBlogSchema
}