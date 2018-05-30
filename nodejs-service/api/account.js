//首页的4个Tab入口
const config = require('../config');
const logger = require('../lib/logging').getLogger('routers/index');

const express = require('express');

const mdb = require('../mongoose');
const redis = require('promise-redis')();

const path = require('path');

const multer = require('multer');

const dest = path.join(__dirname, '..', 'public');
const upload = multer({ dest });

const redisClient = redis.createClient(config.redis);

const router = express.Router();

router.post('/log', (req, res) => {
  res.end();
});

/**
# 获取用户信息
GET http://localhost:3000/api/account/
Authorization: Bearer JDJhJDEwJHBIYzhUMFNteGVJcnF0WW1KYy9HZmVVYk1sd1dKR3VKSHNxZ3gvWXp6cWxOWGN0TDNzS2lH
*/
router.get('/', async (req, res, next) => {
  if (!req.$wxUserInfo) {
    return next('invalid auth.');
  }

  const mobile = req.$wxUserInfo._id;
  const user = await mdb.User.findById(mobile);
  logger.debug('user', user);
  res.json({
    success: true,
    user,
  });
});

/**
# 保存用户信息
POST http://localhost:3000/api/
Content-Type: application/json
Authorization: Bearer JDJhJDEwJHBIYzhUMFNteGVJcnF0WW1KYy9HZmVVYk1sd1dKR3VKSHNxZ3gvWXp6cWxOWGN0TDNzS2lH
{
    "nickName": "test #3"
}
#
*/
//  curl -X POST http://xxx.com/userinfo -H "Authorization: Bearer JDJhJDEwJHBIYzhUMFNteGVJcnF0WW1KYy9HZmVVYk1sd1dKR3VKSHNxZ3gvWXp6cWxOWGN0TDNzS2lH" -H "Content-Type: application/json" -d '{ "nickname": "zhaolei"}'
router.post('/', async (req, res, next) => {
  if (!req.$wxUserInfo) {
    return next('invalid auth.');
  }

  logger.debug('req.body', req.body);
  req.body._id = req.$wxUserInfo._id;

  const userinfo = await mdb.User.findByIdAndUpdate(req.$wxUserInfo._id,
    req.body, {
      upsert: true,
      setDefaultsOnInsert: true,
      new: true,
    });
  logger.info(userinfo);
  redisClient.setex(userinfo._id, 30 * 60 * 60 * 24, JSON.stringify(userinfo));

  res.json({
    success: true,
    userinfo,
  });
});

module.exports = router;
