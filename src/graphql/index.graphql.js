const { GtaphQlObjectType, GraphQLObjectType, GraphQLSchema } = require("graphql")
const { BlogResolver } = require("./queries/blog.resolver")
const { ProductResolver } = require("./queries/product.resolver")
const { CategoryResolver, CategoryChildResolver } = require("./queries/category.resolver")
const { CommentForBlogResolver, CommentForProductResolver, CommentForCourseResolver } = require("./mutations/comment.resolver")
const { LikeAndDislikeBlogResolver, LikeAndDislikeProductResolver, LikeAndDislikeCourseResolver } = require("./mutations/likeAndDislike.resolver")
const { QuestionForBlogResolver } = require("./mutations/question.resolver")
const { BookmarkBlogResolver, BookmarkProductResolver, BookmarkCourseResolver } = require("./mutations/bookmark.resolver")
const { CourseResolver } = require("./queries/course.resolver")
const { BookmarkedBlogResolver, BookmarkedProductResolver, BookmarkedCourseResolver } = require("./queries/userProfile.resolver")
const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        blogs: BlogResolver,
        products: ProductResolver,
        category: CategoryResolver,
        childOfCategory: CategoryChildResolver,
        course: CourseResolver,

    }
})

//GUD
const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        BlogComment: CommentForBlogResolver,
        BlogQuestion: QuestionForBlogResolver,
        ProductComment: CommentForProductResolver,
        CourseComment: CommentForCourseResolver,
        likeAndDisLikProduct: CommentForCourseResolver,
        LikeBlog: LikeAndDislikeBlogResolver,
        LikeProduct: LikeAndDislikeProductResolver,
        LikeCourse: LikeAndDislikeCourseResolver,
        BoomarkBlog: BookmarkBlogResolver,
        BookmarkProduct: BookmarkProductResolver,
        BookmarkCourse: BookmarkCourseResolver,
        UserBookmarkedBlog: BookmarkedBlogResolver,
        UserBookmarkedProduct:BookmarkProductResolver,
        UserBookmarkedCourse:BookmarkedCourseResolver

    }
})
const graphQLSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})

module.exports = {
    graphQLSchema
}