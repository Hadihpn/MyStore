const { GraphQLList } = require("graphql")
const blogServices = require("../../modules/admin/blog/blog.services")
const { AuthorizationInGraphQl } = require("../../common/guard/authorization.guard");
const { CourseType } = require("../typeDefs/course.type");
const courseServices = require("../../modules/admin/course/course.services");

const CourseResolver = {
    type: new GraphQLList(CourseType),
    resolve: async (_,args,context) => {
        // req?.cookies?.accessToken = context.req.headers
        console.log(context.req.headers.authorization);
        const {req,res} = context
        // req.user = await AuthorizationInGraphQl(req,res)
        // return await BlogModel.find({}).populate('author')
        return await courseServices.findCourse()
    }
}

module.exports = {
    CourseResolver
}