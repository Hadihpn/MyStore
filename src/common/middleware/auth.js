const { UserModel } = require("../../modules/client/user/user.model");

async function checklogin(req, res, next) {
  try {
    const accessToken = req.signedCookies["authorization"];
    console.log("token");
    console.log(accessToken);

    if (accessToken) {
      const user = await UserModel.findOne({ accessToken });
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
