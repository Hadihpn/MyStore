/**
 * @swagger
 *  components:
 *      schemas:
 *          Blog:
 *              type: object
 *              required:
 *                  -   author
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   image
 *              properties:
 *                  author:
 *                      type: string
 *                      description: the id of author
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  short_text:
 *                      type: string
 *                      description: the summary of text of blog
 *                  text:
 *                      type: string
 *                      description: the text of blog
 *                  tags:
 *                      type: string
 *                      description: the list of tags for example(tag1#tag2#tag_foo)
 *                  category:
 *                      type: string
 *                      description: the id of category for foreinField in blog
 *                  image:
 *                      type: file
 *                      description: the index picture of blog
 *          BlogUpdate:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  short_text:
 *                      type: string
 *                      description: the summary of text of blog
 *                  text:
 *                      type: string
 *                      description: the text of blog
 *                  tags:
 *                      type: string
 *                      description: the list of tags for example(tag1#tag2#tag_foo)
 *                  category:
 *                      type: string
 *                      description: the id of category for foreinField in blog
 *                  image:
 *                      type: file
 *                      description: the index picture of blog
 */ 


/**
 * @swagger
 *  /admin/blog:
 *      get:
 *          tags: [ Blog(AdminPanel)]
 *          summary: get all blogs
 *          responses:
 *              200:
 *                  description: success - get array of blogs
 */
/**
 * @swagger
 *  /admin/blog/createBlog:
 *      post:
 *          tags: [ Blog(AdminPanel)]
 *          summary: create Blog document
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Blog'
 *          responses:
 *              201:
 *                  description: created
 */
/**
 * @swagger
 *  /admin/blog/update/{id}:
 *      patch:
 *          tags: [ Blog(AdminPanel)]
 *          summary: update  Blog document by id 
 *          consumes: 
 *              -   multipart/form-data
 *          parameters:
 *              -   in: path
 *                  required: true
 *                  name: id
 *                  type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/BlogUpdate'
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/blog/{id}:
 *      get:
 *          summary: get blog by ID and populate this field 
 *          tags: [ Blog(AdminPanel) ]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */

