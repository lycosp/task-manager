const User = require('../models/user.model.js');

// get all users
exports.getAll = (req, res) => {
    User.getAll((err, results) => {
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
    const ID = req.params.userID;
    User.getUser(ID, (err, results) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found user with id ${ID}`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving user with id " + ID
                });
            }
        } else {
            res.send(results);
        }
    });
};

// update a selected user
exports.updateUser = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Content is empty.'
        });
    }
    User.updateUser(req.params.userID, new User(req.body), (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found user with id ${req.body.USERNAME}.`
                });
            } else {
                res.status(500).send({
                    message: `Error updating user with id ${req.body.USERNAME}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};