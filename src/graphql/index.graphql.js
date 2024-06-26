const { GtaphQlObjectType, GraphQLObjectType, GraphQLSchema } = require("graphql")
const { BlogResolver } = require("./queries/blog.resolver")
const { ProductResolver } = require("./queries/product.resolver")
const { CategoryResolver, CategoryChildResolver } = require("./queries/category.resolver")
const { CommentForBlogResolver, CommentForProductResolver, CommentForCourseResolver } = require("./mutations/comment.resolver")
const { LikeAndDislikeBlogResolver, LikeAndDislikeProductResolver, LikeAndDislikeCourseResolver } = require("./mutations/likeAndDislike.resolver")
const { QuestionForBlogResolver } = require("./mutations/question.resolver")
const { BookmarkBlogResolver, BookmarkProductResolver, BookmarkCourseResolver } = require("./mutations/bookmark.resolver")
const { CourseResolver } = require("./queries/course.resolver")
const { BookmarkedBlogResolver, BookmarkedProductResolver, BookmarkedCourseResolver, getUserBasketResolver } = require("./queries/userProfile.resolver")
const { AddCourseToBasket, AddProductToBasket, RemoveProductFromBasket, RemoveCourseFromBasket,  } = require("./mutations/basket.resolver")
const { removeProductFromBasket } = require("../modules/admin/user/user.service")
const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        blogs: BlogResolver,
        products: ProductResolver,
        category: CategoryResolver,
        childOfCategory: CategoryChildResolver,
        course: CourseResolver,
        UserBookmarkedBlog: BookmarkedBlogResolver,
        UserBookmarkedProduct:BookmarkProductResolver,
        UserBookmarkedCourse:BookmarkedCourseResolver,
        getUserBasketResolver
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
        AddCourseToBasket,
        AddProductToBasket,
        RemoveProductFromBasket,
        RemoveCourseFromBasket
        

    }
})
const graphQLSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})

module.exports = {
    graphQLSchema,
    
}