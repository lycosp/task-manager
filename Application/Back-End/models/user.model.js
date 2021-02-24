const sql = require('./db.js');

// constructor
const User = function (user) {
    this.ID = user.ID;
    this.USERNAME = user.USERNAME;
    this.PRIVILEGE_ID = user.PRIVILEGE_ID;
};

// ---------------- API CALLS ---------------- \\

// get all users
User.getAll = result => {
    sql.query('SELECT a.ID, USERNAME, PRIVILEGE_ID, PRIVILEGE FROM USERS a LEFT JOIN USER_PRIVILEGES b on b.ID = PRIVILEGE_ID', (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        result(null, res);
    });
};

// get a single user
User.getUser = (userID, result) => {
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
};

User.updateUser = (id, user, result) => {
    sql.query('UPDATE USERS SET USERNAME = ?, PRIVILEGE_ID = ? WHERE ID = ?', [user.USERNAME, user.PRIVILEGE_ID, id], (err, res) => {
        if (err) {
            console.error('error ', err);
            result(err, null);
            return;
        }
        if (res.affectedRows === 0) {
            result({ kind: 'not_found' }, null);
            return;
        }

        result(null, { ...user });
    });
};

module.exports = User;