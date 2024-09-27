const { UserModel } = require("../../modules/client/user/user.model");

async function checklogin(req, res, next) {
  try {
    const accessToken = req.signedCookies["authorization"];
    console.log("token");
    console.log(accessToken);

    if (accessToken) {
      const user = await UserModel.findOne({ accessToken },{bills:0,address:0,discount:0,Role:0,verifiedMobile:0,birthday:0,Courses:0,createdAt:0,updatedAt:0,otp:0});
      if (user) {
        req.user = user;
        return next();
      }
    }
    return res.render("login.ejs", {
      error: "have to login in your account",
    });
  } catch (error) {
    next(error);
  }
}
async function checkAccesslogin(req, res, next) {
  try {
    const accessToken = req.signedCookies["authorization"];
    if (accessToken) {
      const user = await UserModel.findOne({ accessToken });
      if (user) {
        return res.redirect("/client/chat/Chatbox");
      }
    }
    return next();
  } catch (error) {
    next(error);
  }
}
module.exports = {
  checklogin,
  checkAccesslogin,
};
