const Privilege = require('../models/privilege.model.js');

// get all privileges
exports.getAll = (req, res) => {
    Privilege.getAll((err, results) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'error when retrieving privileges.'
            });
        } else {
            res.send(results);
        }
    });
}