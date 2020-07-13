const mongoose = require('mongoose');
const logger = require('../logger/logger');

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.MONGO_URI, options).then((conn) => {
  logger.info(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold);
});
