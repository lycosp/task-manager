const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// setup express and headers
const app = express();
app.use(cors({
    origin: '*'
}));

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// return hello world when someone pings back-end on page '/'
app.get('/', (req, res) => {
    res.json({ message: "Hello World!" });
});


// import routes for CRUD operations, pass express into them
require('./routes/user.routes.js')(app);
require('./routes/privilege.routes.js')(app);

// open nodejs server port and connection
const server = app.listen(3000, () => {
    const port = server.address().port;

    console.log("Server started on port %s", port);
});