const { randomInt } = require("crypto");
const { randomNumberDigit } = require("../validators/developer/func.schema");
const fs = require("fs");
const path = require("path");
const { isArray } = require("util");
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
function deleteInvalidPropertyInObject(data = {}, blackListFields = []) {
  let nullishData = ["", " ", "0", 0, null, undefined]
  Object.keys(data).forEach(key => {
    if (blackListFields.includes(key)) delete data[key];
    if (typeof data[key] == "string") data[key] = data[key].trim();
    if (Array.isArray(data[key]) && data[key].length > 0) { data[key] = data[key].map(item => item.trim()) }
    else if (Array.isArray(data[key]) && data[key].length == 0) { delete data[key] }
    if (nullishData.includes(data[key])) delete data[key];
    // blog[key] = data[key]
  })
}
function removePathBackSlash(address) {
  address = address.toString().replace(/\\/g, "/")
  return address
}
function listOfImagesFormRequest(files, fileUploadPath) {
  if (!files) {
    return ""
  } else if (Array.isArray(files) && files?.length > 0) {
    return (files.map(file => path.join(fileUploadPath, file.filename)).toString().replace(/\\/g, "/"))
  } else {
    return path.join(fileUploadPath, files.filename).toString().replace(/\\/g, "/")
  }

}
function copyObject(object) {
  return JSON.parse(JSON.stringify(object))
}
function convertToNormalTime(seconds) {
  let total = Math.round(seconds) / 60;
  let [minutes, percent] = String(total).split(".");
  let second = Math.round((percent * 60) / 100).toString().substring(0, 2)
  let houre = 0;
  if (minutes > 60) {
    total = minutes / 60;
    let [hour, percent] = String(total).split(".");
    let minutes = Math.round((percent * 60) / 100).toString().substring(0, 2)

  }
  return (houre + ":" + minutes + ":" + second)
}
module.exports = {
  unSupportedString,
  removePropertyInObject,
  RandomeNumberGenerator,
  deleteFileInPublic,
  removePathBackSlash,
  listOfImagesFormRequest,
  copyObject,
  deleteInvalidPropertyInObject,
  convertToNormalTime
}