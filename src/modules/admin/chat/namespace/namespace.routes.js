const namespaceController = require("./namespace.controller");

const router = require("express").Router();

router.post("/add",namespaceController.addNamespace)
router.get("/",namespaceController.getNamespaces)
module.exports = {
    NameSpaceRoutes:router
}