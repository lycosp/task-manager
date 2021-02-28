const mysql = require('mysql');
const dbConfig = require('../config/db.config.js');

// Create mysql connection to DB
const conn = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

// Open connection to mysql. Retry connection at least 5 times if it doesn't connect the first time
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

        await new Promise(res => setTimeout(res, 5000));
    }
}
module.exports = conn;