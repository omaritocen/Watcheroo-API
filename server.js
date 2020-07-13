const express = require('express');
const logger = require('./logger/logger');

const app = express();

app.get('/', (req, res, next) => {
  res.json({
    success: true,
    result: 'Hello World',
  });
});

require('./startup/config');
require('./startup/db');

const port = process.env.PORT || 5000;

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`.yellow.bold);
});
