class ChatController {

    renderChatRoom(req, res, next) {
        try {
            return res.render("chat.ejs")
        } catch (error) {
            next(error)
        }
    }

}
module.exports = new ChatController()