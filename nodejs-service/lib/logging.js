const log4js = require('log4js');

exports.getLogger = (name) => {
  const logger = log4js.getLogger(name);
  logger.level = 'DEBUG';
  return logger;
};
