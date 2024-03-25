const autoBind = require("auto-bind");
const { CategoryModel } = require("../../../models/category");
const { CategoryMessage } = require("../../Messages/admin/category.messages");
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
            categoryDto.slug = slugify(categoryDto.slug.toString());
        }
        else {
            categoryDto.slug = slugify(categoryDto.name.toString())
        }
        await this.alreadyExistBySlug(categoryDto.slug)
        await this.#model.create(categoryDto);
    }
    async checkExistById(id) {
        const category = this.#model.findById(id)
        if (!category) throw new createHttpError.NotFound(CategoryMessage.WrongParentId)
        return category;
    }
    async alreadyExistBySlug(slug) {
        const isExist = await this.#model.exists({ slug })
        if (isExist) throw new createHttpError.Conflict(CategoryMessage.alreadyExistedSlug)
        return false;
    }
}
module.exports = new CategoryService();