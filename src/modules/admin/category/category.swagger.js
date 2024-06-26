

/**
 * @swagger
 *  components:
 *      schemas:
 *        CreateCategory:
 *          type: object  
 *          required:
 *              - title
 *              - slug
 *              - icon
 *          properties:
 *              title:
 *                  type: string  
 *              slug:
 *                  type: string  
 *              icon:
 *                  type: string  
 *              parent:
 *                  type: string  
 *        EditCategory:
 *          type: object  
 *          required:
 *              - title
 *          properties:
 *              title:
 *                  type: string  
 *        CheckOtp:
 *          type: object  
 *          required:
 *              - phone
 *              - code
 *          properties:
 *              phone:
 *                  type: string  
 *              code:
 *                  type: string        
 *        RefreshToken:
 *          type: object  
 *          required:
 *              - refreshToken
 *          properties:
 *              refreshToken:
 *                  type: string  
 */

/**
 * @swagger
 * /admin/category/addCategory:
 *  post:
 *      summary: create new category 
 *      description: here u can add new category
 *      tags:  [AdminPanel-Category]
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateCategory'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateCategory'
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
 * /admin/category/allCategory:
 *  get:
 *      summary: get the All categories
 *      description: get all categories 
 *      tags: [AdminPanel-Category]
 *      responses:
 *          200: 
 *              description: successfully
 *          404: 
 *              description: Not Found
 *              
 */
/**
 * @swagger
 * /admin/category/parents:
 *  get:
 *      summary: get the sub categories
 *      description: get all categories that have any parent
 *      tags: [AdminPanel-Category]
 *      responses:
 *          200: 
 *              description: successfully
 *          404: 
 *              description: Not Found
 *              
 */
/**
 * @swagger
 * /admin/category/getCategory/{id}:
 *  get:
 *      summary: get  category by id
 *      description: get any category just by id
 *      tags: [AdminPanel-Category]
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *      responses:
 *          200: 
 *              description: successfully
 *          404: 
 *              description: Not Found
 *              
 */
/**
 * @swagger
 * /admin/category/child/{parent}:
 *  get:
 *      summary: get the child of sub category
 *      description: get all child of sub category
 *      tags: [AdminPanel-Category]
 *      parameters:
 *          -   in: path
 *              name: parent
 *              type: string
 *              required: true
 *      responses:
 *          200: 
 *              description: successfully
 *          404: 
 *              description: Not Found
 *              
 */
/**
 * @swagger
 * /admin/category/children/{parent}:
 *  get:
 *      summary: get the children of sub category
 *      description: get all children of sub category
 *      tags: [AdminPanel-Category]
 *      parameters:
 *          -   in: path
 *              name: parent
 *              type: string
 *              required: true
 *      responses:
 *          200: 
 *              description: successfully
 *          404: 
 *              description: Not Found
 *              
 */
/**
 * @swagger
 * /admin/category/edit/{id}:
 *  patch:
 *      summary: edit category
 *      description: edit title of category by id
 *      tags: [AdminPanel-Category]
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/EditCategory'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/EditCategory'
 *      responses:
 *          200: 
 *              description: successfully
 *          500: 
 *              description: Internal Server Error
 *              
 */
/**
 * @swagger
 * /admin/category/remove/{id}:
 *  delete:
 *      summary: remove category
 *      description: remove category by id
 *      tags:  [AdminPanel-Category]
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *      responses:
 *          200: 
 *              description: successfully
 *          404: 
 *              description: Not Found
 *              
 */