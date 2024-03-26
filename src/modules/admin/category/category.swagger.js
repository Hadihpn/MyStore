

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
 *      tags:
 *          -   [AdminPanel-Category]
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
 * /user/checkOtp:
 *  post:
 *      summary: enter the otp code for login
 *      description: enter the code that has been sent to user
 *      tags:
 *          -   [User-Authentication]
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CheckOtp'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CheckOtp'
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
 * /user/refreshToken:
 *  post:
 *      summary: send refresh token to get new token and refresh token
 *      description: refresh token
 *      tags:
 *          -   [User-Authentication]
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/RefreshToken'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/RefreshToken'
 *    
 *      responses:
 *          200: 
 *              description: success
 *         
 */

/**
 * @swagger
 * /admin/category/parents:
 *  get:
 *      summary: get the sub categories
 *      description: get all categories that have any parent
 *      tags:
 *          - [AdminPanel-Category]
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
 *      tags:
 *          - [AdminPanel-Category]
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