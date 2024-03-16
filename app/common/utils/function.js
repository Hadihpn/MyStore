const unSupportedString = (value) => [""," ",0,null,undefined,"0",NaN].includes(value);
const removePropertyInObject = (target = {}, properties = []) => { 

    for(const item of properties){
        delete target[item];
    }
    return target;
}
module.exports = {
    unSupportedString,
    removePropertyInObject
}