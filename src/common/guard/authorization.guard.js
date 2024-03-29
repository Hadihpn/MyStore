const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const authServices = require("../../modules/client/authentication/auth.services");
const { AuthMessage } = require("../../modules/client/authentication/auth.messages");
require("dotenv").config();

const Authorization = async (req, res, next) => {
    try {
        const accessToken = req?.cookies?.accessToken;
        console.log("token is :", accessToken)
         if (!accessToken) throw new createHttpError.BadRequest(AuthorizationMessage.NotFoundAccount);
        const data = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
        if(data && data.phone){
            const user = await authServices.getUserByPhone(data.phone);
            user.otp=0
            user.accessToken=""
            
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