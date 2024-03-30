

/**
 * @swagger
 *  components:
 *      schemas:
 *        CreateBlog:
 *          type: object  
 *          required:
 *              - author
 *              - title
 *              - tags
 *              - category
 *          properties:
 *              author:
 *                  type: string  
 *              title:
 *                  type: string  
 *              short_text:
 *                  type: string  
 *              image:
 *                  type: string  
 *              image:
 *                  type: string  
 *              image:
 *                  type: string  
 *              image:
 *                  type: string  
 */

/**
 * @swagger
 * /admin/blog/createBlog:
 *  post:
 *      summary: create new blog 
 *      description: here u can add new blog
 *      tags:
 *          -   [AdminPanel-Category]
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateBlog'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateBlog'
 *      responses:
 *          201: 
 *              description: created
 *          400: 
 *              description: bad request
 *          401: 
 *              description: unAuthorize
 *          500: 
 *              description: InternalServer Error
 */

/**
 * @swagger
 * /admin/blog/getBlogs:
 *  get:
 *      summary: get the All blogs
 *      description: get all blogs 
 *      tags:
 *          - [AdminPanel-Category]
 *      responses:
 *          200: 
 *              description: successfully
 *          404: 
 *              description: Not Found
 *              
 */
