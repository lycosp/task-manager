const sql = require('./db.js');

// constructor
const Users = users => {
    this.id = users.id;
    this.username = users.username;
    this.privilege_id = users.privilege_id;
    this.privilege = users.privilege;
};

// ---------------- API CALLS ---------------- \\

// get all users
Users.getAll = result => {
    sql.query('SELECT a.ID, USERNAME, PRIVILEGE_ID, PRIVILEGE FROM USERS a LEFT JOIN USER_PRIVILEGES b on b.ID = PRIVILEGE_ID', (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        result(null, res);
    });
};

// get a single user
Users.getUser = (userID, result) => {
    // check if userID is a number, if not go to else
    if (Number.isInteger(Number.parseInt(userID))) {
        sql.query('SELECT a.ID, USERNAME, PRIVILEGE_ID, PRIVILEGE FROM USERS a LEFT JOIN USER_PRIVILEGES b ON b.ID = PRIVILEGE_ID WHERE a.ID = ?', userID, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }

            if (res.length) {
                result(null, res[0]);
                return;
            }

            result({ kind: 'not_found' }, null);
        });
    } else {
        sql.query('SELECT a.ID, USERNAME, PRIVILEGE_ID, PRIVILEGE FROM USERS a LEFT JOIN USER_PRIVILEGES b ON b.ID = PRIVILEGE_ID WHERE USERNAME = ?', userID, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }

            if (res.length) {
                result(null, res[0]);
                return;
            }

            result({ kind: 'not_found' }, null);
        });
    }

};

Users.updateUser = (username, privilegeID, userID) => {
    sql.query('UPDATE USERS SET USERNAME = ?, PRIVILEGE_ID = ? WHERE ID = ?', [username, privilegeID, userID], (err, res) => {
        if (err) {
            console.error('error ', err);
            result(err, null);
            return;
        }

        result(null, res);
    })
}

module.exports = Users;