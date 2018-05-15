const config = require('../config');
const logger = require('../lib/logging').getLogger('lib/xlsx');

const XLSX = require('xlsx');
const _ = require('lodash');
const pinyin = require('pinyin');

const path = require('path');
const fs = require('fs');

const rp = require('request-promise');

const mdb = require('../mongoose');

const cols = ['手机号码', '姓名', '所属', '简介'];

// 导入通讯录
exports.parseEquipment = async (file, owner) => {
  async function processRows(subject, rows) {
    let equipment = await mdb.Equipment.findOneAndUpdate({
      owner,
      subject,
    }, {
      owner,
      subject,
    }, {
      upsert: true,
      setDefaultsOnInsert: true,
      new: true,
    });

    // equipments
    let rowslength = 0;
    const equipment_promises = _.map(rows, async (row) => {
      // 前2列内容必填，后面的列任意
      if (!(row[cols[0]] && row[cols[1]])) {
        return null;
      }

      //user
      const user = await mdb.User.findOne({
        mobile: row[cols[0]],
      });

      let properties = { ...row };
      delete properties[cols[0]];
      delete properties[cols[1]];
      delete properties[cols[2]];
      delete properties[cols[3]];
      properties = _.map(properties, (v, k) => ({
        prop_key: k,
        prop_value: v,
      }));

      const member = {
        mobile: row[cols[0]].replace(/\D/g, ''),
        user,
        equipmentName: row[cols[1]],
        pinyin: pinyin(row[cols[1]].substring(0, 1), { style: pinyin.STYLE_FIRST_LETTER })[0][0].toUpperCase(),
        equipmentTitle: row[cols[2]],
        equipmentTitle2: row[cols[3]],
        properties,
      };

      const dbMember = _.find(equipment.toObject().items, { mobile: member.mobile });
      if (dbMember) {
        //update
        logger.error('update', {
          ...dbMember,
        });
        equipment = await mdb.Equipment.findOneAndUpdate({
          _id: equipment._id,
          'items.mobile': member.mobile,
        }, {
          $set: {
            'items.$': {
              ...dbMember,
              ...member,
            },
          },
        }, {
          setDefaultsOnInsert: true,
          new: true,
        });
      } else {
        // insert
        logger.error('insert', member);
        equipment = await mdb.Equipment.findByIdAndUpdate(equipment._id, {
          $push: {
            items: {
              $each: [
                member,
              ],
            },
          },
        }, {
          setDefaultsOnInsert: true,
          new: true,
        });
      }
      // logger.info('insert equipment', equipment);
      rowslength += 1;
      return equipment;
    });

    const equipment_results = await Promise.all(equipment_promises);
    logger.info('equipments', equipment_results);
    return rowslength;
  }

  const workbook = XLSX.readFile(file);
  const rows = _.sum(await Promise.all(_.map(workbook.SheetNames, async (sheetName) => {
    const worksheet = workbook.Sheets[sheetName];
    const rs = XLSX.utils.sheet_to_row_object_array(worksheet);
    logger.error(rs);

    return await processRows(sheetName, rs);
  })));

  return `导入了${rows}条数据。`;
};

