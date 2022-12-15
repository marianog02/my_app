const express = require('express')
const jwt = require('jsonwebtoken')
const user = express.Router()
const db = require('../config/database')

user.get("/", async (req, res, next) => {
    const query = "SELECT * FROM employees"
    const rows = await db.query(query)
    console.log("hey")
    return res.status(200).json({ code: 200, message: rows })
})
//insert
user.post("/add", async (req, res, next) => {

    console.log("hi")
    const {name, lastname, email, address} = req.body
    
    if (name && name && email && address) {
        let query = "INSERT INTO EMPLOYEES (name, lastname, email, address)"
        query += `VALUES('${name}',${lastname},${email},${address})`
        const rows = await db.query(query)
        console.log(rows)

        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "Empleado Insertado Correctamente" })
        }
        return res.status(500).json({ code: 500, message: "Ocurrio un Error" })
    }

    return res.status(500).json({code: 500, message: "Campos incompletos"})

})

module.exports = user;