// handle api routes for users
module.exports = app => {
    const user = require('../controllers/user.controller.js');

    // Get all users
    app.post('/api/users', user.getAll);

    // Get a single user
    app.post('/api/users/:userID', user.getUser);

    // Update user with userID
    app.put('/api/users/:userID', user.updateUser);
};