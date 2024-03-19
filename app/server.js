const express = require("express")
require("dotenv").config();
const { default: mongoose } = require("mongoose");
const path = require("path");
const morgan = require("morgan");
const createError = require("http-errors");
const SwaggerConfig = require("./utils/config/swagger.config");
const { AllRoutes } = require("./router/router.routes");
const cookieParser = require("cookie-parser");
module.exports = class Application {
    #app = express()
    #DB_URI
    #PORT
    constructor(PORT, DB_URI) {
        this.#PORT = PORT;
        this.#DB_URI = DB_URI;
        this.configApplication();
        this.connectToMongoDB();
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
        http.createServer(this.#app).listen(this.#PORT, () => {
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
