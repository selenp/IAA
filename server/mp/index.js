//首页的4个Tab入口
const config = require('../config');
const logger = require('../lib/logging').getLogger('mp/index');

const express = require('express');

const mdb = require('../mongoose');
const redis = require('promise-redis')();

const redisClient = redis.createClient(config.redis);

const router = express.Router();

router.post('/log', (req, res) => {
  res.end();
});

/**
#保存用户信息
POST http://localhost:3000/mp/token_login
Authorization: JDJhJDEwJHBIYzhUMFNteGVJcnF0WW1KYy9HZmVVYk1sd1dKR3VKSHNxZ3gvWXp6cWxOWGN0TDNzS2lH
*/
router.post('/token_login', async (req, res, next) => {
  if (!req.$wxUserInfo) {
    return next('invalid auth.');
  }
  const user = await mdb.User.findById(req.$wxUserInfo._id);
  logger.info(user);
  redisClient.setex(user._id, 30 * 60 * 60 * 24, JSON.stringify(user));
  res.json({
    success: true,
    user,
  });
});

/**
# scan qrcode
GET http://localhost:3000/mp/socket/s8fKkuCtviYyn_0dAAAB
Authorization: JDJhJDEwJHBIYzhUMFNteGVJcnF0WW1KYy9HZmVVYk1sd1dKR3VKSHNxZ3gvWXp6cWxOWGN0TDNzS2lH
*/
router.get('/socket/:socket', async (req, res, next) => {
  if (!req.$wxUserInfo) {
    return next('invalid auth.');
  }
  try {
    const { socket } = req.params;

    const user = await mdb.User.findById(req.$wxUserInfo._id);
    req.app.emit('res_login_scan_token', socket, req.$token, user);
    return res.json({
      success: true,
      msg: '登录成功',
    });
  } catch (err) {
    logger.error(err);
    return res.render('result', {
      success: false,
      msg: '用户登录出错',
    });
  }
});

module.exports = router;
