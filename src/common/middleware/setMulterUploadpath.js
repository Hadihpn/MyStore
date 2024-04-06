const setFolderPath = function (folder) {
    console.log(folder);
    return async function (req, res, next) {
        req.folderPath = folder;
        next()
    }
}

module.exports = {
    setFolderPath
}