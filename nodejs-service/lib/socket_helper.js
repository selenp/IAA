/**
 * socket的帮助
 */
const config = require('../config');
const logger = require('../lib/logging').getLogger('lib/socket_helper');

exports.helper = (socket) => {
  logger.debug('socket user connected: ', socket.id);

  socket.on('req_socket_id', () => {
    logger.debug('req_socket_id: ', socket.id);

    socket.emit('res_socket_id', socket.id);
  });

  socket.on('disconnect', () => {
    logger.debug('disconnect: ', socket.id);
  });
};
