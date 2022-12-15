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

    const {name, lastname, email, address} = req.body
    
    if (name && name && email && address) {
        let query = "INSERT INTO EMPLOYEES (name, lastname, email, address)"
        query += `VALUES('${name}','${lastname}','${email}','${address}')`
        console.log(query)
        const rows = await db.query(query)
        console.log(rows)

        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "Empleado Insertado Correctamente" })
        }
        return res.status(500).json({ code: 500, message: "Ocurrio un Error" })
    }

    return res.status(500).json({code: 500, message: "Campos incompletos"})

})

//delete
user.delete("/delete/:id([0-9]{1,3})", async(req, res, next) =>{
    const query = `DELETE FROM EMPLOYEES WHERE id = '${req.params.id}'`

    const rows = await db.query(query)

    if(rows.affectedRows == 1){
        return res.status(200).json({code: 200, message: "Empleado borrado correctamente"})
    }

    return res.status(404).json({code: 404, message:"Empleado no encontrado"})
})

//Modify

user.put("/modify/:id([0-9]{1,3})", async(req, res, next)=>{
    const {name, lastname, email, address} = req.body

    if (name && name && email && address) {
        let query = `UPDATE EMPLOYEES SET name = '${name}', lastname = '${lastname}', email = '${email}', `
        query +=  `address = '${address}' WHERE id = ${req.params.id}`
        const rows = await db.query(query)
        console.log(rows)

        if (rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "Empleado Actualizado Correctamente" })
        }
        return res.status(500).json({ code: 500, message: "Ocurrio un Error" })
    }

    return res.status(500).json({code: 500, message: "Campos incompletos"})

})

//search by name
user.get("/search/:name([A-Za-z]+)", async (req, res, next) => {
    const name = req.params.name
    const employee = await db.query("SELECT * FROM EMPLOYEES WHERE name='"+ name + "';")
    if (employee.length > 0){
        return res.status(200).json({code: 200, message: employee})
    }
    res.status(404).send({code: 404, message: "Empleado no encontrado"})
})

module.exports = user;