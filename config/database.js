const mysql = require('mysql')
const util = require('util')

const MYSQLHOST =  process.env.MYSQLHOST || 'localhost'
const MYSQLUSER =  process.env.MYSQLUSER || 'root'
const MYSQLPASSWORD =  process.env.MYSQLPASSWORD || 'admin'
const MYSQLDATABASE =  process.env.MYSQLDATABASE || 'hr_workshop'

const pool = mysql.createPool({
    connectionLimit: 10,
    host: `${MYSQLHOST}`,
    user: `${MYSQLUSER}`,
    password:`${MYSQLPASSWORD}`,
    database: `${MYSQLDATABASE}`
})

pool.query = util.promisify(pool.query)
module.exports = pool