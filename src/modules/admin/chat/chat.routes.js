const { ChatboxRoutes } = require("./chatbox/chatbox.routes");
const { NameSpaceRoutes } = require("./namespace/namespace.routes");

const router = require("express").Router();

router.use("/chat",ChatboxRoutes)
router.post("/namespace",NameSpaceRoutes)
module.exports = {
    ChatRoutes:router
}