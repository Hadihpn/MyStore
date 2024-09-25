const { error } = require("@hapi/joi/lib/base");
const { UserModel } = require("../../user/user.model");
const jwt = require("jsonwebtoken");

class ChatBoxController {
  renderChatRoom(req, res, next) {
    try {
      return res.render("chat.ejs");
    } catch (error) {
      next(error);
    }
  }
  renderLoginForm(req, res, next) {
    try {
      return res.render("login.ejs", {
        error: undefined,
      });
    } catch (error) {
      next(error);
    }
  }
  async Login(req, res, next) {
    try {
      const {phone} = req.body;

      const user = await UserModel.findOne({ phone },{basket:0,Courses:0,discount:0,password:0,otp:0});
      console.log(user);

      if (!user)
        return res.render("login.ejs", {
          error: "username or password is incorrect",
        });
      const token = await jwt.sign({ phone }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
      user.accessToken = token;
      await user.save();
      res.cookie("authorization", token, {
        signed: true,
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      });
      res.redirect("/client/chat/Chatbox/")
      return res.json({
        token,
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new ChatBoxController();
