const logger = require('../lib/logging').getLogger('lib/error');
/**
 * Error middlewares
 */

module.exports = (parentApp) => {
  // catch 404 and forward to error handler
  parentApp.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers
  parentApp.use((err, req, res, next) => {
    if (err && err.status !== 404) logger.error(err);

    res.status(err.status || 401);

    res.json({
      success: false,
      msg: err.message,
    });
  });
};
