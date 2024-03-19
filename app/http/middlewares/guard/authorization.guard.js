const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const authServices = require("../../services/user/auth.services");
const { AuthMessage } = require("../../Messages/user/auth.messages");
require("dotenv").config();

const Authorization = async (req, res, next) => {
    try {
        const accessToken = req?.cookies?.accessToken;
        console.log("token is :", accessToken)
         if (!accessToken) throw new createHttpError.BadRequest(AuthorizationMessage.NotFoundAccount);
        const data = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
        console.log(data.id);
        if(data && data.id){
            const user = await authServices.getUserById(data.id)
            console.log(user)
            if (!user) throw new createHttpError.BadRequest(AuthorizationMessage.NotFoundAccount)
            req.user = user;
            return next()
        }
        else{
            throw new createHttpError.Unauthorized(AuthorizationMessage.UnAuthorize);
        }
    } catch (error) {
        next(error)
    }

}
module.exports = Authorization