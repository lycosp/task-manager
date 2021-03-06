// handle api routes for users
module.exports = app => {
    const user = require('../controllers/user.controller.js');

    // Get all users
    app.post('/api/users', user.getAll);

    // Get a single user
    app.post('/api/users/:userID', user.getUser);

    // Update user with userID
    app.put('/api/users/:userID', user.updateUser);

    // Delete user with userID
    app.delete('/api/users/:userID', user.removeUser);

    // Insert a user into the users table
    app.put('/api/users', user.addUser);
};