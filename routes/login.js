const express = require('express')
const jwt = require('jsonwebtoken')
const login = express.Router()
const db = require('../config/database')


login.post("/", async (req, res, next) => {
    console.log("hello")
    const { user_email, user_password } = req.body
    const query = `SELECT * FROM USERS WHERE user_email = '${user_email}' AND user_password = '${user_password}';`

    const rows = await db.query(query)

    if (user_email && user_password) {
        if (rows.length == 1) {
            const token = jwt.sign({
                user_id: rows[0].user_id,
                user_mail: rows[0].user_email
            }, "debugkey")
            return res.status(200).json({ code: 200, message: token })

        } else {

            return res.status(401).json({ code: 401, message: "Usuario y/o contraseña incorrectas" })

        }
    }
    return res.status(500).json({ code: 500, message: "Campos Incompletos" })

})

module.exports = login;