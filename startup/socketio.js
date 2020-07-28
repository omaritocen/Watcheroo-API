let io;

module.exports.init = (server) => {
    io = require('socket.io')(server);    
    require('../socketioEvents/events');
    require('../socketioEvents/watch');
    return io;
}

module.exports.getIO = () => {
    if (!io) {
        throw new Error('socket.io is not initalized');
    }

    return io;
}