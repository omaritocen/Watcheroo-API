const logger = require('../logger/logger');

const io = require('../startup/socketio').getIO();

io.on('connection', (socket) => {
    logger.info('New Client Connected');
});
