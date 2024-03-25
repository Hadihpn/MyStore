module.exports = {
    expiresOTP: 1000 * 60 * 2,
    yearPerSecond: 365 * 24 * 60 * 60,
    MongoIDPattern:/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
    ROLES: {
        USER: "USER",
        ADMIN: "ADMIN",
        WRITTER: "WRITTER",
        TEACHER: "TEACHER",
        SUPPLIER: "SUPPLIER"
    }
}