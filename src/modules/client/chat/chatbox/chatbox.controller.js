class ChatBoxController {

    renderChatRoom(req, res, next) {
        try {
            console.log("ass");
            
            return res.render("chat.ejs")
        } catch (error) {
            next(error)
        }
    }

}
module.exports = new ChatBoxController()