// handle GET, POST, PUT, DELETE requests for users
module.exports = app => {
    const users = require('../controllers/users.controller.js');

    // Get all users
    app.post('/api/users', users.getAll);

    // Get a single user
    app.post('/api/users/:userID', users.getUser);
};