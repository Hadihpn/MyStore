const { randomInt } = require("crypto");
const { randomNumberDigit } = require("../validators/developer/func.schema");
async function RandomeNumberGenerator(digits){
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
module.exports = {
    unSupportedString,
    removePropertyInObject,
    RandomeNumberGenerator
}