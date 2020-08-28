const express = require('express');
const logger = require('./logger/logger');
const path = require('path');

const app = express();


// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Loading essential configuaration for the API
require('./startup/config')(app);
require('./startup/db');

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    logger.info(`Server is running on port ${port}`.yellow.bold);
});

// CONT: Loading essential configuaration for the API
require('./startup/socketio').init(server);
require('./startup/routes')(app);
