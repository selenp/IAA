const path = require('path');
const xlsx = require('../lib/xlsx');

describe('equipment', () => {
  it('read', async () => {
    const result = await xlsx.parseEquipment(path.join(__dirname, '..', 'public', '通讯录模版.xlsx'), 'oyr790C_6qAX1Osnu0osMCJGaIu4');
    console.log(result);
  });
});
