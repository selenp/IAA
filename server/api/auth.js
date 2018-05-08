//首页的4个Tab入口
const config = require('../config');
const logger = require('../lib/logging').getLogger('routers/auth');

const express = require('express');
const redis = require('promise-redis')();
const mdb = require('../mongoose');
const SMSClient = require('@alicloud/sms-sdk');
//初始化sms_client
const smsClient = new SMSClient(config.aliyun.sms);

const redisClient = redis.createClient(config.redis);

const router = express.Router();

const randomIntInc = (low, high) => Math.floor(Math.random() * (high - low + 1) + low);

/**
POST http://192.168.1.101:3000/api/auth/send_code
Content-Type: application/json
Authorization: Bearer JDJhJDEwJHBIYzhUMFNteGVJcnF0WW1KYy9HZmVVYk1sd1dKR3VKSHNxZ3gvWXp6cWxOWGN0TDNzS2lH
{
    "mobile": "18624357886"
}
#
*/
// curl -X POST http://192.168.1.101:3000/api/auth/send_code -H "Authorization: Bearer JDJhJDEwJHBIYzhUMFNteGVJcnF0WW1KYy9HZmVVYk1sd1dKR3VKSHNxZ3gvWXp6cWxOWGN0TDNzS2lH"-H "Content-Type: application/json" -d '{ "mobile": "18624357886"}'
router.post('/send_code', async (req, res, next) => {
  if (!req.$wxUserInfo) {
    return next('invalid auth.');
  }

  const { mobile } = req.body;
  const tpl_id = 'SMS_134135117';
  const rand = randomIntInc(1000, 9999);

  const results = await smsClient.sendSMS({
    PhoneNumbers: mobile,
    SignName: '华瑞信息',
    TemplateCode: tpl_id,
    TemplateParam: `{"code":"${rand}"}`,
  });
  logger.info(results, rand);

  await redisClient.setex(`${config.id}_${req.$wxUserInfo._id}_mobile`, (60 * 60), mobile);
  await redisClient.setex(`${config.id}_${req.$wxUserInfo._id}_verify_code`, (60 * 60), rand);

  res.json({
    success: results.error_code === 0,
    msg: results.reason,
  });
});

/**
POST http://192.168.1.101:3000/api/auth/verify_code
Content-Type: application/json
Authorization: Bearer JDJhJDEwJHBIYzhUMFNteGVJcnF0WW1KYy9HZmVVYk1sd1dKR3VKSHNxZ3gvWXp6cWxOWGN0TDNzS2lH
{
    "code": "6446"
}
#
*/

// curl -X POST http://192.168.1.101:3000/api/auth/verify_code -H "Authorization: Bearer JDJhJDEwJHBIYzhUMFNteGVJcnF0WW1KYy9HZmVVYk1sd1dKR3VKSHNxZ3gvWXp6cWxOWGN0TDNzS2lH" -H "Content-Type: application/json" -d '{ "code": "111111"}'
router.post('/verify_code', async (req, res, next) => {
  if (!req.$wxUserInfo) {
    return next('invalid auth.');
  }
  const { code } = req.body;

  const rand = await redisClient.get(`${config.id}_${req.$wxUserInfo._id}_verify_code`);
  if (rand === code) {
    const mobile = await redisClient.get(`${config.id}_${req.$wxUserInfo._id}_mobile`);
    const user = await mdb.User.findByIdAndUpdate(req.$wxUserInfo._id, {
      mobile,
    }, {
      new: true,
    });
    if (user) {
      // 绑定到equipment上
      try {
        await mdb.Equipment.findOneAndUpdate({
          items: {
            $elemMatch: {
              mobile,
            },
          },
        }, {
          $setOnInsert: {
            user,
          },
        });
      } catch (err) {
        logger.error(err);
      }
    }
  }

  res.json({
    success: rand === code,
  });
});

module.exports = router;
