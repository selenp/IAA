//equipment
const config = require('../config');
const logger = require('../lib/logging').getLogger('routers/equipment');

const express = require('express');
const mdb = require('../mongoose');

const path = require('path');
const sharp = require('sharp');

const multer = require('multer');

const dest = path.join(__dirname, '..', 'public');
const upload = multer({ dest });

const router = express.Router();

/**
# equipment信息:
GET http://192.168.1.101:3000/api/equipment/5ae296672b6347b806bd5ae3
Authorization: Bearer JDJhJDEwJHBIYzhUMFNteGVJcnF0WW1KYy9HZmVVYk1sd1dKR3VKSHNxZ3gvWXp6cWxOWGN0TDNzS2lH
*/
router.get('/:equipment_id', async (req, res) => {
  if (!req.$wxUserInfo) {
    return next('invalid auth.');
  }

  const equipment_id = req.params.equipment_id;
  const equipment = await mdb.Equipment.findById(equipment_id);

  res.json({
    success: true,
    equipment,
  });
});

/**
DELETE http://192.168.1.101:3000/api/equipment/5ae296672b6347b806bd5ae3
Authorization: Bearer JDJhJDEwJHBIYzhUMFNteGVJcnF0WW1KYy9HZmVVYk1sd1dKR3VKSHNxZ3gvWXp6cWxOWGN0TDNzS2lH
*/
router.delete('/:equipment_id', async (req, res, next) => {
  if (!req.$wxUserInfo) {
    return next('invalid auth.');
  }
  const { equipment_id } = req.params;

  const equipment = await mdb.Equipment.findByIdAndRemove(equipment_id);
  res.json({
    success: true,
    data: equipment,
  });
});

/**
# equipment信息:
GET http://192.168.1.101:3000/api/equipment/
Authorization: Bearer JDJhJDEwJHBIYzhUMFNteGVJcnF0WW1KYy9HZmVVYk1sd1dKR3VKSHNxZ3gvWXp6cWxOWGN0TDNzS2lH
*/
router.get('/', async (req, res, next) => {
  if (!req.$wxUserInfo) {
    return next('invalid auth.');
  }

  const { page } = req.query;
  const criteria = {};

  const count = await mdb.Equipment.count(criteria);
  const pageSize = config.pageSize;

  const list = await mdb.Equipment.find(criteria)
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
POST http://192.168.1.101:3000/api/equipment/
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

  let equipment;
  if (req.body._id) {
    const data = req.body;
    equipment = await mdb.Equipment.findByIdAndUpdate(req.body._id, data, {
      new: true,
    });
  } else {
    const data = {
      ...req.body,
    };
    delete data._id;
    equipment = new mdb.Equipment(data);
    await equipment.save();
  }

  res.json({
    success: true,
    data: equipment,
  });
});

/**
# new user信息:
POST http://192.168.1.101:3000/api/equipment/uploadCover
Content-Type: application/json
Authorization: Bearer JDJhJDEwJHBIYzhUMFNteGVJcnF0WW1KYy9HZmVVYk1sd1dKR3VKSHNxZ3gvWXp6cWxOWGN0TDNzS2lH
# curl -X POST -H "Accept: application/json" -H "Authorization: Bearer JDJhJDEwJHBIYzhUMFNteGVJcnF0WW1KYy9HZmVVYk1sd1dKR3VKSHNxZ3gvWXp6cWxOWGN0TDNzS2lH" -F "cover=@/Users/zhaolei/Desktop/IMG_0861.JPG" http://192.168.1.101:3000/api/equipment/uploadCover
*/
router.post('/uploadCover', upload.single('cover'), async (req, res, next) => {
  if (!req.$wxUserInfo) {
    return next('invalid auth.');
  }
  logger.error(req.file);
  const src = path.join(dest, req.file.filename);
  const cover = path.join(dest, `cover_240x240_${req.file.filename}`);
  sharp(src).resize(240, 240).toFile(cover, (err, info) => {
    if (err) {
      logger.error(err, info);
    }
  });
  res.json({
    success: true,
    result: req.file.filename,
  });
});
module.exports = router;
