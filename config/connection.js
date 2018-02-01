'use strict'

const mysql = require('mysql'),
    connection = mysql.createConnection({
        database: 'intranetvm',
        host: 'localhost',
        user: 'nctech',
        password: 'nctech'
        
    })
    
connection.connect(function (err) {
    if (err) {
        console.error('Error Connecting: ' + err)
        return
    }
})

module.exports = connection
