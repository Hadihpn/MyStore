const namespaceController = require("./namespace.controller");

const router = require("express").Router();
//#region Namespace

router.post("/add", namespaceController.addNamespace)
router.get("/", namespaceController.getNamespaces)

//#endregion
//#region Room
router.post("/room/add", namespaceController.addNamespace)

//#endregion

//#region Message
router.post("/message/add", namespaceController.addNamespace)

//#endregion


module.exports = {
    NameSpaceRoutes: router
}