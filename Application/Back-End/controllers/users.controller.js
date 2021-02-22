const Users = require('../models/users.model.js');

// get all users
exports.getAll = (req, res) => {
    Users.getAll((err, results) => {
        if (err) {
            res.status(500).send({
                message: err.message || "error when retrieving users."
            });
        } else {
            res.send(results);
        }
    });
};

// get one user
exports.getUser = (req, res) => {
    Users.getUser(req.body.id, (err, results) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found user with id ${req.body.id}`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving user with id " + req.body.id
                });
            }
        } else {
            res.send(results);
        }
    });
};

// get all user privileges
exports.getPrivileges = (req, res) => {
    Users.getPrivileges((err, results) => {
        if (err) {
            res.status(500).send({
                message: err.message || "error when retrieving privileges."
            });
        } else {
            res.send(results);
        }
    });
};