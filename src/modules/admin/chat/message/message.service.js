const autoBind = require("auto-bind")

class MessageService{
constructor(){
    autoBind(this);
}
}

module.exports= new MessageService()