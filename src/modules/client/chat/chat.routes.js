const { ChatboxRoutes } = require("./chatbox/chatbox.routes");
const { NameSpaceRoutes } = require("./namespace/namespace.routes");

const router = require("express").Router();

router.use("/Chatbox",ChatboxRoutes)
router.use("/namespace",NameSpaceRoutes)
module.exports = {
    ChatRoutes:router
}