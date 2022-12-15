const mysql = require('mysql')
const util = require('util')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: $MYSQLHOST,
    user: $MYSQLUSER,
    password:$MYSQLPASSWORD,
    database: $MYSQLDATABASE
})

pool.query = util.promisify(pool.query)
module.exports = pool