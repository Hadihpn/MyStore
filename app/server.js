const express = require("express")
require("dotenv").config();
const { default: mongoose } = require("mongoose");
const path = require("path");
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
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({ extended: true }));
        this.#app.use(express.static(path.join(__dirname + "..", "public")));
    }
    createServer() {
        const http = require("http");
        http.createServer(this.#app).listen(this.#PORT, () => {
            console.log(`server :http://127.0.0.1:${this.#PORT}`);
        })
    }
    connectToMongoDB() {
        mongoose.connect(process.env.MONGODB_URL).then(() => {
            console.log("connected to DB.");
        }).catch(err => {
            console.log(err?.message ?? "Failed DB connection");
        })
        
    }
    createRoutes() {

    }
    errorHandling() {
        this.#app.use((req, res, next) => {
            return res.json({
                statusCode: 404,
                message: "Sorry, we did not find your page... is you write correct?!!! "
            })

        })
        this.#app.use((error, req, res, next) => {
            const statusCode = error.status || 500;
            const message = error.message || "InternalServerError";
            return res.status(statusCode).json({
                statusCode,
                message
            })
        })
    }
}
