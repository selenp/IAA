const config = require('../config.js');

const logger = require('../lib/logging').getLogger('test/test_aggregate.js');

const printTree = require('print-tree');
const _ = require('lodash');

const mdb = require('../mongoose');

describe('group', () => {
  it('equipment', async () => {
    const equipment = await mdb.Equipment.findById('5adf48b92b6347b806bd5adb');


    const deepest = (node) => {
      if (node && node.children && node.children.length > 0) {
        return deepest(node.children[0]);
      }
      return node;
    };

    const findSame = (array, ele) => {
      for (const i of array) {
        if (i.name === ele.name) {
          return i;
        }
      }
      return false;
    };

    const mergeChildren = (s, t) => {
      for (const ti of t.children) {
        const shadow = findSame(s.children, ti);
        if (shadow) {
          mergeChildren(shadow, ti);
        } else {
          s.children.push(ti);
        }
      }
      return s;
    };

    const s = _.reduce(_.map(equipment.items, item => _.reduce(_.split(item.equipmentTitle, '#'), (result, value, key) => {
      const lastNode = deepest(result);
      lastNode.children.push({ name: value, children: [] });
      return result;
    }, {  name: equipment.subject, children: [] })), (r, v, k) => {
      return mergeChildren(r, v);
    }, {  name: equipment.subject, children: [] });

    console.log(JSON.stringify(s));

    const treetext = printTree(s,
              node => node.name.toUpperCase(),
              node => node.children);

    console.log(treetext);
  });
});
