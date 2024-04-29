const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const authServices = require("../../modules/client/authentication/auth.services");
const AuthorizationMessage = require("../messages/authentication.messages");
const roleController = require("../../modules/admin/Role/role.controller");
const roleService = require("../../modules/admin/Role/role.service");
require("dotenv").config();

const Authorization = async (req, res, next) => {
    try {
        const accessToken = req?.cookies?.accessToken;
        console.log("token is :", accessToken)
        if (!accessToken) throw new createHttpError.BadRequest(AuthorizationMessage.NotFoundAccount);
        const data = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
        if (data && data.phone) {
            const user = await authServices.getUserByPhone(data.phone);
            user.otp = 0
            user.accessToken = ""

            if (!user) throw new createHttpError.BadRequest(AuthorizationMessage.NotFoundAccount)
            req.user = user;
            return next()
        }
        else {
            throw new createHttpError.Unauthorized(AuthorizationMessage.UnAuthorize);
        }
    } catch (error) {
        next(error)
    }

}
function checkPermission(requiredPermissions = []) {
    return async function (req, res, next) {
        try {
            const dataBaseQuery = {}
            const role = req.user.Role;
            if (role) dataBaseQuery['$text'] = { $search: role }
            const roles = await roleService.getAllRole(dataBaseQuery)
            const userPermissions = roles[0].permissions.map(item => item.title.toLower())
            const hasPermission = requiredPermissions.every(permissions => { return userPermissions.includes(permissions.toLower()) })
            if (requiredPermissions.length == 0 || hasPermission) return next()
            throw new createHttpError.Forbidden("دسترسی لازم به این بخش را ندارید")
            return next()
        } catch (error) {
            next(error)
        }
    }

}
module.exports = { Authorization, checkPermission }