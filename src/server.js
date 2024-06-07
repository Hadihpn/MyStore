const express = require("express")
require("dotenv").config();
const { default: mongoose } = require("mongoose");
const path = require("path");
const morgan = require("morgan");
const createError = require("http-errors");
const SwaggerConfig = require("./config/swagger.config");
const { AllRoutes } = require("./router.routes");
const cookieParser = require("cookie-parser");
const ExpressEjsLayout = require("express-ejs-layouts");
const expressEjsLayouts = require("express-ejs-layouts");
const { initialSocket } = require("./common/utils/initialSocket");
const { socketHandler } = require("./socket.io");
module.exports = class Application {
    #app = express()
    #DB_URI
    #PORT
    constructor(PORT, DB_URI) {
        this.#PORT = PORT;
        this.#DB_URI = DB_URI;
        this.configApplication();
        this.initTemplateEngine()
        this.connectToMongoDB();
        this.initRedis();
        this.createServer();
        this.createRoutes();
        this.errorHandling();

    }
    configApplication() {
        this.#app.use(morgan("dev"))
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({ extended: true }));
        this.#app.use(express.static(path.join(__dirname + "..", "public")));
        this.#app.use(cookieParser(process.env.COOKIE_SECRET_KEY))
        SwaggerConfig(this.#app);
        
    }
    createServer() {
        const http = require("http");
        // const crypto = require("crypto");
        // const key = crypto.randomBytes(32).toString("hex").toUpperCase();
        // console.log(key);
        const server = http.createServer(this.#app);
        const io = initialSocket(server);
        socketHandler(io);
        server.listen(this.#PORT, () => {
            console.log(`server :http://127.0.0.1:${this.#PORT}`);
        })
    }
    connectToMongoDB() {
        mongoose.connect(this.#DB_URI).then(() => {
            console.log("connected to DB.");
        }).catch(err => {
            console.log(err?.message ?? "Failed DB connection");
        })
        mongoose.connection.on("connected", () => {
            console.log("mongoose connected")
        })
        mongoose.connection.on("disconnected", () => {
            console.log("mongoose disconnected")
        })
    }
    initRedis(){
        require("./common/utils/initRedis")
    }
    initTemplateEngine(){
        this.#app.use(expressEjsLayouts)
        this.#app.set("view engine","ejs")
        this.#app.set("views","resource/views");
        this.#app.set("layout extractStyles",true)
        this.#app.set("layout extractScripts",true)
        this.#app.set("layout","./layouts/main")
    }
    createRoutes() {
        this.#app.use(AllRoutes);
    }
    errorHandling() {


        this.#app.use((req, res, next) => {
            next(createError.NotFound("Sorry, we did not find your page... is you write correct?!!!"))

        })
        this.#app.use((error, req, res, next) => {
            const serverError = createError.InternalServerError()
            const statusCode = error.status || serverError.status;
            const message = error.message || serverError.message;
            return res.status(statusCode).json({
                errors: {
                    statusCode,
                    message
                }
            })
        })
    }
    
}
