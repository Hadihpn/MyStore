
/**
 * @swagger
 *  components:
 *      schemas:
 *         addRole:
 *              type: object
 *              required:
 *                     - title
 *                     - permissions
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of role
 *                  permissions:
 *                      type: array
 *                      items: 
 *                          type: string
 *                      description: the id of permissions for
 *         updateRole:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of Role
 *                  permissions:
 *                      type: array
 *                      items: 
 *                          type: string
 *                          description: the id of permissions for
 */


/**
 * @swagger
 *  /admin/role/:
 *      get:
 *          tags: [ RoleManagment(AdminPanel)]
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
 *  /admin/role/addRole:
 *      post:
 *          tags: [ RoleManagment(AdminPanel)]
 *          summary: add  role  
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/addRole'
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/role/update/{id}:
 *      patch:
 *          tags: [ RoleManagment(AdminPanel)]
 *          summary: update  Role  by id 
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/updateRole'
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/role/delete/{field}:
 *      delete:
 *          summary: remove role by ID  Or Title
 *          tags: [ RoleManagment(AdminPanel) ]
 *          parameters:
 *              -   in: path
 *                  name: field
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */