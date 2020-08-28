const admin = require('../startup/firebaseAdmin');

const logger = require('../logger/logger');


// Send a message to the device corresponding to the provided
// registration token.
module.exports.sendNotificationWithData = (title, body, registrationToken, data) => {
    const msg = {
        notification: {
            title: title,
            body: body,
        },
        token: registrationToken,

        'android': {
            'notification': {
                'click_action': 'FLUTTER_NOTIFICATION_CLICK'
            }
        },
        data,

    };

    sendMessage(msg);
};

const sendMessage = (message) => {
    admin
        .messaging()
        .send(message)
        .then((response) => {
            // Response is a message ID string.
            logger.info(`Successfully sent message: ${response}`);
        })
        .catch((error) => {
            logger.error(`Error sending message: ${error}`);
        });
};
