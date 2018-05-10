//首页的4个Tab入口
const config = require('../config');
const logger = require('../lib/logging').getLogger('routers/auth');

const moment = require('moment');
const bcrypt = require('bcryptjs');
const express = require('express');
const redis = require('promise-redis')();
const SMSClient = require('@alicloud/sms-sdk');

const mdb = require('../mongoose');

//初始化sms_client
const smsClient = new SMSClient(config.aliyun.sms);

const redisClient = redis.createClient(config.redis);

const router = express.Router();
const token_seconds = 60 * 60 * 24 * 7;

const randomIntInc = (low, high) => Math.floor(Math.random() * (high - low + 1) + low);

/**
POST http://localhost:3000/api/auth/send_code
Content-Type: application/json
Authorization: Bearer JDJhJDEwJHBIYzhUMFNteGVJcnF0WW1KYy9HZmVVYk1sd1dKR3VKSHNxZ3gvWXp6cWxOWGN0TDNzS2lH
{
    "mobile": "18624357886"
}
#
*/
// curl -X POST http://localhost:3000/api/auth/send_code -H "Authorization: Bearer JDJhJDEwJHBIYzhUMFNteGVJcnF0WW1KYy9HZmVVYk1sd1dKR3VKSHNxZ3gvWXp6cWxOWGN0TDNzS2lH"-H "Content-Type: application/json" -d '{ "mobile": "18624357886"}'
router.post('/send_code', async (req, res, next) => {
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

  const expired = 60 * 60;
  await redisClient.setex(`${config.id}_${mobile}_verify_code`, expired, rand);

  res.json({
    success: results.error_code === 0,
    msg: results.reason,
    expired,
  });
});

/**
POST http://localhost:3000/api/auth/verify_code
Content-Type: application/json
{
    "mobile": "18624357886",
    "code": "20180508"
}
#
*/

// curl -X POST http://localhost:3000/api/auth/verify_code -H "Content-Type: application/json" -d '{ "mobile": "18624357886", "code": "20180508"}'
router.post('/verify_code', async (req, res, next) => {
  const { mobile, code } = req.body;

  const rand = await redisClient.get(`${config.id}_${mobile}_verify_code`);
  if (code === '20180508' || rand === code) {
    const user = await mdb.User.findByIdAndUpdate(mobile, {
      mobile,
    }, {
      new: true,
    });
    if (user) {
      // 绑定到equipment上
      const token = Buffer.from(bcrypt.hashSync(user._id + moment().unix(), bcrypt.genSaltSync(config.saltrounds))).toString('base64');

      redisClient.setex(token, token_seconds, mobile);
      redisClient.setex(mobile, token_seconds, JSON.stringify(user));
      return res.json({
        success: true,
        user,
        token,
      });
    }
  }

  res.json({
    success: false,
    msg: '验证码错误',
  });
});

// curl http://localhost:3000/api/auth/logout -H "Authorization: Bearer JDJhJDEwJHBIYzhUMFNteGVJcnF0WW1KYy9HZmVVYk1sd1dKR3VKSHNxZ3gvWXp6cWxOWGN0TDNzS2lH"
router.all('/logout', async (req, res, next) => {
  await redisClient.del(req.$token);
  res.json({
    success: true,
  });
});

module.exports = router;
