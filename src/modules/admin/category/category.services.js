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
                        existedCategory.parents.map(id => id.toString())
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
        // return await this.#model.find({ parent: { $exists: false } }).populate([{ path: "children" }])
        // return await this.#model.aggregate([
        //     {
        //         $lookup: {
        //             from: "categories",
        //             localField: "_id",
        //             foreignField: "parent",
        //             as: "children"
        //         }
        //     },
        //     {
        //         $match: {
        //             parent: undefined
        //         }
        //     },
        //     {
        //         $project: {
        //             __v: 0,
        //             "children.__v": 0,
        //             "children.parent": 0,

        //         }
        //     }
        // ])
        return await this.#model.aggregate([
            {
                $graphLookup: {
                    from: "categories",
                    startWith: "$_id",
                    connectFromField: "_id",
                    connectToField: "parent",
                    maxDepth: 5,
                    depthField: "depth",
                    as: "children"
                }
            },
            {
                $match: {
                    parent: undefined
                }
            },
            {
                $project: {
                    __v: 0,
                    "children.__v": 0,
                    "children.parent": 0,

                }
            }
        ])
    }
    async getCategoryById(id) {
        return await this.#model.findById(id).populate([{ path: "children" }])
    }
    async getParentsCategory() {
        return await this.#model.find({ parent: undefined })
    }
    async getChildOfParent(parent) {
        return await this.#model.find({ parent }, { __v: 0, parent: 0, parents: 0 })
    }
    async getChildrenOfParent(parent) {
        return await this.#model.find({ parents: { $in: parent } }, { __v: 0, parent: 0, parents: 0 })
    }
    async removeCategory(_id) {
        try {
            const category = await this.checkExistById(_id);
            await this.#model.deleteMany({
                $or: [
                    { _id:category._id },
                    { parents: { $in: category._id } }
                ]
            })
            // const children = await this.getChildrenOfParent(_id)
            // if (children) {
            //     for (const item of children) {
            //         let _id = item._id;
            //         await this.#model.deleteOne({ _id })

            //     }
            // }
            // await this.#model.deleteOne({ _id })
        } catch (error) {
            next(error)
        }
    }
    async checkExistById(_id) {
        const category = this.#model.findOne({ _id })
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