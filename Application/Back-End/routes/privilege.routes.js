// handle api routes for privileges
module.exports = app => {
    const priv = require('../controllers/privilege.controller.js');

    // get all privileges
    app.post('/api/privileges', priv.getAll);
};