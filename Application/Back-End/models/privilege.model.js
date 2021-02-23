const sql = require('./db.js');

// constructor
const Privilege = privilege => {
    this.id = privilege.id;
    this.privilege = privilege.privilege;
};

// ---------------- API CALLS ---------------- \\

// get all privileges
Privilege.getAll = results => {
    sql.query('SELECT * FROM USER_PRIVILEGE', (err, res) => {
        if (err) {
            results(null, err);
            return;
        }

        result(null, res);
    });
};

module.exports = Privilege;