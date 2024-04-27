
/**
 * @swagger
 *  components:
 *      schemas:
 *         addPermission:
 *              type: object
 *              required:
 *                     - title
 *                     - description
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of Role
 *                  description:
 *                      type: string
 *                      description: the description of Role
 *         updatePermission:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of Role
 *                  description:
 *                      type: string
 *                      description: the description of Role
 */


/**
 * @swagger
 *  /admin/permission/:
 *      get:
 *          tags: [ PermissionManagment(AdminPanel)]
 *          summary: get all Users
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success - get array of products
 */
/**
 * @swagger
 *  /admin/permission/add:
 *      post:
 *          tags: [ PermissionManagment(AdminPanel)]
 *          summary: add  permission   
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/addPermission'
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/permission/update/{field}:
 *      patch:
 *          tags: [ PermissionManagment(AdminPanel)]
 *          summary: update  permission  by id or title 
 *          parameters:
 *              -   in: path
 *                  name: field
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/addPermission'
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/permission/delete/{field}:
 *      delete:
 *          summary: remove permission by ID Or Title
 *          tags: [ PermissionManagment(AdminPanel)]
 *          parameters:
 *              -   in: path
 *                  name: field
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */