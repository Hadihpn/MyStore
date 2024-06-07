const redisDB = require("redis");
const redisClient = redisDB.createClient();
redisClient.connect();
redisClient.on("connect", () => {
    console.log("connect to redis");
})
redisClient.on("connected", () => {
    console.log("connected to redis and ready to use");
})
redisClient.on("error", (err) => {
    console.log("error: " + err);
})
redisClient.on("end", () => {
    console.log("disconnected from redis");
})

module.exports = redisClient;