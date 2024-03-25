const bcrypt = require("bcrypt");
const { RandomeNumberGenerator } = require("../../../common/utils/function");
const router = require("express").Router();

router.get("/password-hash/:password", (req, res, next) => {
    const { password } = req.params;
    const salt = bcrypt.genSaltSync(10);
    return res.json({
        message: "hashedPassword",
        hashedPassword: bcrypt.hashSync(password, salt)
    })
})
router.get("/random-number/:digitNumber", async (req, res, next) => {
    try {
    const { digitNumber } = req.params;
    const digits = parseInt(digitNumber)
    const newRandomNumber = await RandomeNumberGenerator(digits)
    return res.json({
        message: "newRandomNumber",
        randomNumber: newRandomNumber
    })
    } catch (error) {
      next(" لطفا عدد را بدرستی وارد نمایید " + error)  
    }
})
module.exports = {
    DeveloperRoutes: router
}