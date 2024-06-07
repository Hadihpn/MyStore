const autoBind = require("auto-bind");
const messageService = require("./message.service");
const {StatusCodes:HttpStatus} = require("http-status-codes")

class MessageController{
    #service;
    constructor(){
        autoBind(this)
        this.#service = messageService
    }
}
module.exports = new MessageController()