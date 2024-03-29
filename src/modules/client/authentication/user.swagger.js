/** 
 * @swagger
 *  tags:
 *      name: Indexpage
 *      description: User routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *        LoginUser:
 *          type: object  
 *          required:
 *              - phone
 *          properties:
 *              phone:
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
 * /client/user/login:
 *  post:
 *      summary: create new option for category
 *      description: one time password
 *      tags:
 *          -   [User-Authentication]
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/LoginUser'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/LoginUser'
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
 * /client/user/checkOtp:
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
 * /client/user/refreshToken:
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
 * /:
 *  get:
 *      summary: Main routes
 *      description: get all need data for index page
 *      tags:
 *          - Indexpage
 *      responses:
 *          200: 
 *              description: successfully
 *          404: 
 *              description: Not Found
 *              
 */