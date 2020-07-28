const express = require('express');
const logger = require('./logger/logger');

const app = express();

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
