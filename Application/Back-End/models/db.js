const mysql = require('mysql');
const dbConfig = require('../config/db.config.js');

// Create mysql connection to DB
const conn = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

// connect to the mysql database and retry at least 5 times
(async () => {
    let retries = 5;
    while (retries) {
        try {
            conn.connect(error => {
                if (error) throw console.error('Error Connection: ' + error.stack);
                console.log('Connection to %s successful!', dbConfig.DB);
            });
            break;
        } catch (err) {
            console.error(err);
            retries -= 1;
            console.log('retries left: ', retries);
            // wait 5 seconds before looping again
            await new Promise(res => setTimeout(res, 5000));
        }
    }
});

module.exports = conn;