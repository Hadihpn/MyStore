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
function deleteFileInPublic(fileAddress) {
  if(fileAddress){
    const pathFile = path.join(__dirname, "..", "..", "..", "public", fileAddress)
    if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile)
  }
}
module.exports = {
    unSupportedString,
    removePropertyInObject,
    RandomeNumberGenerator,
    deleteFileInPublic
}