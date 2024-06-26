const { setFolderPath } = require("../../../../common/middleware/setMulterUploadpath");
const { uploadFile } = require("../../../../common/utils/multer");
const namespaceController = require("./namespace.controller");

const router = require("express").Router();
//#region Namespace

router.post("/add", namespaceController.addNamespace)
router.get("/", namespaceController.getNamespaces)

//#endregion
//#region Room
router.post("/room/add",setFolderPath("chatRoom"),uploadFile.single("image"), namespaceController.addRoom)
router.get("/room", namespaceController.getRooms)

//#endregion

//#region Message
router.post("/message/add", namespaceController.addNamespace)

//#endregion


module.exports = {
    NameSpaceRoutes: router
}