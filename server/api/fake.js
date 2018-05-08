//night相关
const config = require('../config');
const logger = require('../lib/logging').getLogger('routers/fake');

const bcrypt = require('bcryptjs');

const express = require('express');
const mdb = require('../mongoose');
const redis = require('promise-redis')();

const redisClient = redis.createClient(config.redis);

const router = express.Router();

/**
GET http://192.168.1.101:3000/api/fake/18624357886
*/
router.get('/:mobile', async (req, res, next) => {
  const mobile = req.params.mobile;
  const token = new Buffer(bcrypt.hashSync(mobile, config.saltRounds)).toString('base64');
  const user = await mdb.User.findByIdAndUpdate(mobile, {
    _id: mobile,
  }, {
    upsert: true,
    new: true,
  });

  logger.info('token', token, 'user', user);
  if (!user) {
    return next(new Error('invalid user.'));
  }
  redisClient.setex(token, 30 * 60 * 60 * 24, mobile);
  redisClient.setex(mobile, 30 * 60 * 60 * 24, JSON.stringify(user));

  res.json({
    success: true,
    token,
  });
});

module.exports = router;
