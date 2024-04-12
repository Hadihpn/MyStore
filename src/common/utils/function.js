const { randomInt } = require("crypto");
const { randomNumberDigit } = require("../validators/developer/func.schema");
const fs = require("fs");
const path = require("path");
async function RandomeNumberGenerator(digits) {
  const start = 10 ** (digits - 1)
  const end = "9".repeat(digits)
  return randomInt(start, parseInt(end));
}

const unSupportedString = (value) => ["", " ", 0, null, undefined, "0", NaN].includes(value);
const removePropertyInObject = (target = {}, properties = []) => {

  for (const item of properties) {
    delete target[item];
  }
  return target;
}
function deleteFileInPublic(files) {
  Object.keys(files).forEach(item => {
    if (item) {
      const pathFile = path.join(__dirname, "..", "..", "..", "public", files[item])
      if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile)
    }
  })
}
function removePathBackSlash(address) {
  address = address.toString().replace(/\\/g, "/")
  return address
}
function listOfImagesFormRequest(files, fileUploadPath) {
  if (files?.length > 0) {
    return (files.map(file => path.join(fileUploadPath, file.filename)).toString().replace(/\\/g, "/"))
  } else {
    return []
  }
}
function copyObject(object){
    return JSON.parse(JSON.stringify(object))
}
module.exports = {
  unSupportedString,
  removePropertyInObject,
  RandomeNumberGenerator,
  deleteFileInPublic,
  removePathBackSlash,
  listOfImagesFormRequest,
  copyObject
}