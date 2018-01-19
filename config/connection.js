'use strict'

const mysql = require('mysql'),
    connection = mysql.createConnection({
        database: 'intranetvm',
        host: 'localhost',
        user: 'root',
        password: 'nctech'
    })
    
connection.connect(function (err) {
    if (err) {
        console.error('Error Connecting: ' + err)
        return
    }
})

module.exports = connection
