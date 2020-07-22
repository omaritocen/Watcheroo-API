const logger = require('../logger/logger');

const io = require('../startup/socketio').getIO();

const watch = io.of('/watch');

watch.use((socket, next) => {
    // ensure the user has sufficient rights
    next();
});

watch.on('connection', (socket) => {
    logger.info('New Client Connected on watch');
});
