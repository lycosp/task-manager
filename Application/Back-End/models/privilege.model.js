const sql = require('./db.js');

// constructor
const Privilege = function(privilege) {
    this.id = privilege.ID;
    this.privilege = privilege.PRIVILEGE;
};

// ---------------- API CALLS ---------------- \\

// get all privileges
Privilege.getAll = result => {
    sql.query('SELECT * FROM USER_PRIVILEGES', (err, res) => {
        if (err) {
            results(null, err);
            return;
        }

        result(null, res);
    });
};

module.exports = Privilege;