//workstation
const config = require('../config');
const logger = require('../lib/logging').getLogger('routers/workstation');

const express = require('express');
const mdb = require('../mongoose');

const path = require('path');
const sharp = require('sharp');

const multer = require('multer');

const dest = path.join(__dirname, '..', 'public');
const upload = multer({ dest });

const router = express.Router();

/**
# workstation信息:
GET http://localhost:3000/api/workstation/5af2537b5611846381335108
Authorization: Bearer JDJhJDEwJHBIYzhUMFNteGVJcnF0WW1KYy9HZmVVYk1sd1dKR3VKSHNxZ3gvWXp6cWxOWGN0TDNzS2lH
*/
router.get('/:workstation_id', async (req, res) => {
  if (!req.$wxUserInfo) {
    return next('invalid auth.');
  }

  const workstation_id = req.params.workstation_id;
  const workstation = await mdb.Workstation.findById(workstation_id);

  res.json({
    success: true,
    data: workstation,
  });
});

/**
DELETE http://localhost:3000/api/workstation/5ae296672b6347b806bd5ae3
Authorization: Bearer JDJhJDEwJHBIYzhUMFNteGVJcnF0WW1KYy9HZmVVYk1sd1dKR3VKSHNxZ3gvWXp6cWxOWGN0TDNzS2lH
*/
router.delete('/:workstation_id', async (req, res, next) => {
  if (!req.$wxUserInfo) {
    return next('invalid auth.');
  }
  const { workstation_id } = req.params;

  const workstation = await mdb.Workstation.findByIdAndRemove(workstation_id);
  res.json({
    success: true,
    data: workstation,
  });
});

/**
# workstation信息:
GET http://localhost:3000/api/workstation/
Authorization: Bearer JDJhJDEwJHBIYzhUMFNteGVJcnF0WW1KYy9HZmVVYk1sd1dKR3VKSHNxZ3gvWXp6cWxOWGN0TDNzS2lH
*/
router.get('/', async (req, res, next) => {
  if (!req.$wxUserInfo) {
    return next('invalid auth.');
  }

  const { page } = req.query;
  const criteria = {};

  const count = await mdb.Workstation.count(criteria);
  const pageSize = config.pageSize;

  const list = await mdb.Workstation.find(criteria)
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
#
POST http://localhost:3000/api/workstation/
Content-Type: application/json
Authorization: Bearer JDJhJDEwJHBIYzhUMFNteGVJcnF0WW1KYy9HZmVVYk1sd1dKR3VKSHNxZ3gvWXp6cWxOWGN0TDNzS2lH
{
    "_id": "5af04efcaf870dd2f190dd2a",
    "subject": "test #1"
}
#
*/
router.post('/', async (req, res, next) => {
  if (!req.$wxUserInfo) {
    return next('invalid auth.');
  }

  let workstation;
  if (req.body._id) {
    const data = req.body;
    workstation = await mdb.Workstation.findByIdAndUpdate(req.body._id, data, {
      new: true,
    });
  } else {
    const data = {
      ...req.body,
    };
    delete data._id;
    workstation = new mdb.Workstation(data);
    await workstation.save();
  }

  res.json({
    success: true,
    data: workstation,
  });
});

module.exports = router;
