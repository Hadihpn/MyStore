const autoBind = require("auto-bind");
const userService = require("./user.service");
const { StatusCodes: httpstatus } = require("http-status-codes");
const { deleteInvalidPropertyInObject } = require("../../../common/utils/function");

class UserController {
    #service
    constructor() {
        autoBind(this);
        this.#service = userService
    }
    async getAllUser(req, res, next) {
        try {
            const { search } = req.query;
            const dataBaseQuery = {}
            if (search) dataBaseQuery['$text'] = { $search: search }
            const users = await this.#service.getAllUser(dataBaseQuery);
            return res.status(httpstatus.OK).json({
                statusCode: httpstatus.OK,
                data: {
                    users
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async updateUserProfile(req,res,next){
        try {
            const {id} = req.params;
            const data = req.body;
            console.log(data);
            const blackListField =["phone","otp",'accessToken','refreshToken',"bills","discount","Courses"]
            deleteInvalidPropertyInObject(data,blackListField)
            const profileUpdateResult = await this.#service.updateUserProfile(id,data)
            if(!profileUpdateResult.modifiedCount) throw createHttpError.InternalServerError("بروزرسانی انجام نشد")
            return res.status(httpstatus.OK).json({
                statusCode:httpstatus.OK,
                data:{
                    message:"updated sucessfully"
                }
            })

        } catch (error) {
            next(error)
        }
    }
}
module.exports = new UserController()