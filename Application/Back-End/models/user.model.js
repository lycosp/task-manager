const sql = require('./db.js');

// constructor
const User = user => {
    this.id = user.id;
    this.username = user.username;
    this.privilege_id = user.privilege_id;
    this.privilege = user.privilege;
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

User.updateUser = (id, user, result) => {
    sql.query('UPDATE USERS SET USERNAME = ?, PRIVILEGE_ID = ? WHERE ID = ?', [user.username, user.privilege_id, id], (err, res) => {
        if (err) {
            console.error('error ', err);
            result(err, null);
            return;
        }
        if (res.affectedRows === 0) {
            result({ kind: 'not_found' }, null);
            return;
        }

        result(null, { id: id, ...user });
    })
}

module.exports = User;