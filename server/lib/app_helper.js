/**
 * app的帮助
 */
const config = require('../config');
const logger = require('../lib/logging').getLogger('lib/app_helper');

exports.helper = (app, io) => {
  app.on('res_login_scan_token', async (socket_id, token, user) => {
    logger.debug('app.on res_login_scan_token:', socket_id, token, user);
    io.to(socket_id).emit('res_login_scan_token', { token, user });
  });
};
