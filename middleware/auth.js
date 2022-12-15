const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        console.log(req.headers.authorization)
        const decoded = jwt.verify(token, "debugkey")
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({ code: 401, message: "No tienes permiso" + error })
    }
}