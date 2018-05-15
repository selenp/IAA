//user
const config = require('../config');
const logger = require('../lib/logging').getLogger('mp/user');

const express = require('express');

const mdb = require('../mongoose');

const router = express.Router();

/**
# user信息:
GET http://localhost:3000/mp/user/18624357886
*/
router.get('/:eid', async (req, res) => {
  const { eid } = req.params;
  const user = await mdb.User.findById(eid);

  res.json({
    success: true,
    data: user,
  });
});

/**
# user信息:
DELETE http://localhost:3000/mp/user/18624357886
Authorization: Bearer JDJhJDEwJHBIYzhUMFNteGVJcnF0WW1KYy9HZmVVYk1sd1dKR3VKSHNxZ3gvWXp6cWxOWGN0TDNzS2lH
*/
router.delete('/:eid', async (req, res, next) => {
  if (!req.$wxUserInfo || req.$wxUserInfo.role !== 'super_admin') {
    return next('invalid auth.');
  }

  const eid = req.params.eid;
  const user = await mdb.User.findByIdAndRemove(eid);
  res.json({
    success: true,
    data: user,
  });
});

/**
# all user信息:
GET http://localhost:3000/mp/user/?page=1
Authorization: Bearer JDJhJDEwJHBIYzhUMFNteGVJcnF0WW1KYy9HZmVVYk1sd1dKR3VKSHNxZ3gvWXp6cWxOWGN0TDNzS2lH
*/
router.get('/', async (req, res, next) => {
  if (!req.$wxUserInfo || req.$wxUserInfo.role !== 'super_admin') {
    return next('invalid auth.');
  }

  const { page } = req.query;
  const criteria = {};

  const count = await mdb.User.count(criteria);
  const pageSize = config.pageSize;

  const list = await mdb.User.find(criteria)
    .sort('-_id')
    .skip((page - 1) * pageSize)
    .limit(pageSize);
  res.json({
    success: true,
    list,
    pagination: {
      page: parseInt(page, 10),
      pageSize,
      rowCount: count,
    },
  });
});

/**
# new user信息:
POST http://localhost:3000/mp/user/
Content-Type: application/json
Authorization: Bearer JDJhJDEwJHBIYzhUMFNteGVJcnF0WW1KYy9HZmVVYk1sd1dKR3VKSHNxZ3gvWXp6cWxOWGN0TDNzS2lH
{
    "subject": "test #3"
}
#
*/
router.post('/', async (req, res, next) => {
  if (!req.$wxUserInfo || req.$wxUserInfo.role !== 'super_admin') {
    return next('invalid auth.');
  }

  //TODO: 频度，数量的限制

  let user;
  if (req.body._id) {
    const data = req.body;
    user = await mdb.User.findByIdAndUpdate(req.body._id, data, {
      new: true,
    });
  } else {
    const data = {
      ...req.body,
    };
    delete data._id;
    user = new mdb.User(data);
    await user.save();
  }

  res.json({
    success: true,
    data: user,
  });
});

module.exports = router;
