const setFolderPath = function (folder) {
    return async function (req, res, next) {
        req.folderPath = folder;
        next()
    }
}

module.exports = {
    setFolderPath
}