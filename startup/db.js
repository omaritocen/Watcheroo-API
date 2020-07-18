const mongoose = require('mongoose');
const fawn = require('fawn');
const logger = require('../logger/logger');

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

// Connects to the MONGODB
mongoose.connect(process.env.MONGO_URI, options).then((conn) => {
  logger.info(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold);
});

fawn.init(mongoose);
