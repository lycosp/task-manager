const mysql = require('mysql');
const dbConfig = require('../config/db.config.js');

// Create mysql connection to DB
const conn = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

// Open connection to mysql
conn.connect(error => {
    if (error) throw console.error('Error Connection: ' + error.stack);
    console.log('Connection to %s successful!', dbConfig.DB);
});

module.exports = conn;