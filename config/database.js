const mysql = require('mysql')
const util = require('util')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password:'admin',
    database: 'hr_workshop'
})

pool.query = util.promisify(pool.query)
module.exports = pool