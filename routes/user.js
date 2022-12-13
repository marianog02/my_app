const express = require('express')
const user = express.Router()
const db = require('../config/database')

user.get("/", async (req, res, next) => {
    const query = "SELECT * FROM employees"
    const rows = await db.query(query)
    
    return res.status(200).json({code: 200, message: rows})
})

module.exports = user;