const logger = require('../logger/logger');
const { read } = require('../logger/logger');

const io = require('../startup/socketio').getIO();

const watch = io.of('/watch');

// TODO: TO BE MOVED TO A DATABASE IF BIG
let rooms = {};

const addConnection = (roomId, profileId) => {
    if (!rooms.hasOwnProperty(roomId)) {
        rooms[roomId] = {
            connectedFriends: [],
            readyFriends: [],
        };
    }

    if (!rooms[roomId].connectedFriends.includes(profileId)) {
        rooms[roomId].connectedFriends.push(profileId);
    }
};

const readyUser = (roomId, profileId) => {
    const readyFriends = rooms[roomId].readyFriends;
    const connectedFriends = rooms[roomId].connectedFriends;

    if (readyFriends.includes(profileId)) {
        const index = readyFriends.indexOf(profileId);
        readyFriends.splice(index, 1);
        logger.info(`${profileId} is not ready`);

        return false;
    } else {
        readyFriends.push(profileId);
        logger.info(`${profileId} is ready`);

        return readyFriends.length == connectedFriends.length && readyFriends.length > 1;
    }
};

const disconnect = (roomId, profileId) => {
    let index = rooms[roomId].connectedFriends.indexOf(profileId);
    rooms[roomId].connectedFriends.splice(index, 1);

    if (rooms[roomId].readyFriends.includes(profileId)) {
        index = rooms[roomId].readyFriends.indexOf(profileId);
        rooms[roomId].readyFriends.splice(index, 1);
    }
};

watch.use((socket, next) => {
    // TODO: ensure the user has sufficient rights
    next();
});

watch.on('connection', (socket) => {
    const roomId = socket.handshake.query.roomId;
    const profileId = socket.handshake.query.profileId;

    addConnection(roomId, profileId);

    socket.join(roomId, () => {
        logger.info(
            `Total connected friends in room is ${rooms[roomId].connectedFriends.length}`
        );

        const totalReady = rooms[roomId].readyFriends.length;
        socket.to(roomId).emit('updateReady', totalReady);
        logger.info(`updated the total ready to ${totalReady}`);

    });

    socket.on('ready', () => {
        const allReady = readyUser(roomId, profileId);
        if (allReady) {
            watch.to(roomId).emit('startParty');
            logger.info('party started')
        } else {
            socket.to(roomId).emit('updateReady', rooms[roomId].readyFriends.length);
            logger.info(`Updating ready ${rooms[roomId].readyFriends.length}`);
        }
    });

    socket.on('disconnect', () => {
        disconnect(roomId, profileId);
        logger.info('disconnected user');
    });
});

watch.on('disconnection', () => {
    logger.info('socketIO disconnected');
});

//watch.on('ready', (data) => {});

//watch.on('newWatchParty', (data) => {});
