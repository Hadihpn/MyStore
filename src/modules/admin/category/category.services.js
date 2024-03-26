const autoBind = require("auto-bind");
const { CategoryModel } = require("./category.model");
const { CategoryMessage } = require("./category.messages");
const { isValidObjectId, Types } = require("mongoose");
const { types } = require("@hapi/joi");
const createHttpError = require("http-errors");
const slugify = require("slugify");

class CategoryService {
    #model
    constructor() {
        autoBind(this);
        this.#model = CategoryModel;
    }
    async creatCategory(categoryDto) {
        if (categoryDto?.parent && isValidObjectId(categoryDto.parent)) {
            const existedCategory = await this.checkExistById(categoryDto.parent);
            categoryDto.parent = existedCategory._id;
            categoryDto.parents = [
                ... new Set(
                    ([existedCategory._id.toString()].concat(
                        existedCategory.parents.map(id => id.toString)
                    )).map(id => new Types.ObjectId(id))
                )
            ]
        }
        if (categoryDto.slug) {
            categoryDto.slug = slugify(categoryDto.slug.toString().toLowerCase());
        }
        else {
            categoryDto.slug = slugify(categoryDto.name.toString().toLowerCase())
        }
        await this.alreadyExistBySlug(categoryDto.slug)
        await this.#model.create(categoryDto);
    }
    async getAllCategory() {
        return await this.#model.aggregate([
            {$lookup:{
                from:"categories",
                localField:"_id",
                foreignField:"parent",
                as: "children"
            }},
            {
                $project:{
                    __v:0,
                    "children.__v" :0,
                    "children.parent" :0,
                }
            }
        ])
        
    }
    async getParentsCategory() {
        return await this.#model.find({ parent: undefined })
    }
    async getChildrenOfParent(parent) {
        return await this.#model.find({ parent }, { __v: 0, parent: 0,parents:0 })
    }
    async checkExistById(id) {
        const category = this.#model.findById(id)
        if (!category) throw new createHttpError.NotFound(CategoryMessage.WrongParentId)
        return category;
    }
    async alreadyExistBySlug(slug) {
        const category = await this.#model.findOne({ slug });
        if (category) throw new createHttpError.Conflict(CategoryMessage.alreadyExistedSlug)
        return false;
    }
}
module.exports = new CategoryService();