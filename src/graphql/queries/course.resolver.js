const { GraphQLList, GraphQLString } = require("graphql")
const blogServices = require("../../modules/admin/blog/blog.services")
const { AuthorizationInGraphQl } = require("../../common/guard/authorization.guard");
const { CourseType } = require("../typeDefs/course.type");
const courseServices = require("../../modules/admin/course/course.services");

const CourseResolver = {
    type: new GraphQLList(CourseType),
    args: {
        category: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        // const { req, res } = context
        // req.user = await AuthorizationInGraphQl(req, res)
        const { category } = args;
        const findQuery = category ? { category } : "";
        // return await BlogModel.find({}).populate('author')
        return await courseServices.getCourseByQuery(findQuery)
    }
}

module.exports = {
    CourseResolver
}