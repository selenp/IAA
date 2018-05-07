const _ = require('lodash');
describe('array', () => {
  it('pinyin', (done) => {
    const items = [
      {
        equipmentTitle2: 'd',
        data: [
          {
            _id: '5aa8d349a38c284d3706bfac',
            value: 'f',
            title: 'e',
          },
        ],
        _id: '5aa8d32ea38c284d3706bfaa',
        equipmentTitle: 'c',
        create_date: '2018-03-14T07:45:50.096Z',
        pinyin: 'B',
        equipmentName: 'b',
        mobile: '12345678991',
      },
      {
        create_date: '2018-03-15T05:03:39.390Z',
        mobile: '15642359220',
        equipmentName: '安倍',
        pinyin: 'A',
        _id: '5aa9feab4c96786ea34ac9d3',
        equipmentTitle2: '无',
        data: [
          {
            _id: '5aa9feab4c96786ea34ac9d4',
            value: '辽宁省大连市沙河口区软件园1-1-1-1',
            title: '地址',
          },
        ],
        equipmentTitle: '项目经理',
      },
      {
        equipmentName: '王建伟',
        pinyin: 'W',
        mobile: '15642358770',
        create_date: '2018-03-15T05:06:25.083Z',
        equipmentTitle: '程序员',
        data: [
          {
            _id: '5aa9ff514c96786ea34ac9d7',
            title: '座机号码',
            value: '23715220',
          },
          {
            _id: '5aa9ff514c96786ea34ac9d6',
            value: '辽宁省大连市亿达春田园D座3-2-1',
            title: '住址',
          },
        ],
        equipmentTitle2: '新人',
        _id: '5aa9ff514c96786ea34ac9d5',
      },
      {
        _id: '5aa9ffd74c96786ea34ac9d8',
        data: [
          {
            value: '辽宁省沈阳市和平区万科城13号4-5-1',
            title: '地址',
            _id: '5aa9ffd74c96786ea34ac9d9',
          },
        ],
        equipmentTitle2: '大学老师',
        equipmentTitle: '教授',
        create_date: '2018-03-15T05:08:39.735Z',
        mobile: '13800969220',
        equipmentName: '张建',
        pinyin: 'Z',
      },
      {
        create_date: '2018-03-15T05:13:15.341Z',
        mobile: '13645259320',
        equipmentName: '赵振',
        pinyin: 'Z',
        _id: '5aaa00eb4c96786ea34ac9da',
        equipmentTitle2: '滴滴司机',
        data: [
          {
            _id: '5aaa00eb4c96786ea34ac9db',
            title: '住址',
            value: '辽宁省 大连市 甘井子区辛寨子6-5-4',
          },
        ],
        equipmentTitle: '司机',
      },
      {
        equipmentTitle: '企业老板',
        equipmentTitle2: '合作关系',
        data: [
          {
            value: '116401965',
            title: 'QQ号码',
            _id: '5aaa01be4c96786ea34ac9de',
          },
        ],
        _id: '5aaa01ab4c96786ea34ac9dc',
        equipmentName: '钱多多',
        pinyin: 'Q',
        mobile: '15642350035',
        create_date: '2018-03-15T05:16:27.516Z',
      },
      {
        create_date: '2018-03-15T05:19:14.619Z',
        equipmentName: '孙涛',
        pinyin: '#',
        mobile: '15643436524',
        equipmentTitle2: '经常钓鱼',
        data: [
          {
            value: '辽宁省 大连市 沙河口区5-1-11',
            title: '店铺地址',
            _id: '5aaa02524c96786ea34ac9e0',
          },
        ],
        _id: '5aaa02524c96786ea34ac9df',
        equipmentTitle: '渔具店老板',
      },
      {
        data: null,
        mobile: '15542350070',
        _id: '5aaa02e74c96786ea34ac9e1',
        equipmentTitle2: '',
        equipmentTitle: '小区看门',
        pinyin: 'N',
        create_date: '2018-03-15T05:21:43.115Z',
        equipmentName: '牛大门',
      },
      {
        equipmentTitle: '平安保险',
        pinyin: 'P',
        data: [],
        equipmentTitle2: '卖保险的',
        _id: '5aaa03684c96786ea34ac9e2',
        equipmentName: '程世荣',
        mobile: '15998627645',
        create_date: '2018-03-15T05:23:52.064Z',
      },
    ];
    console.log(_.sortBy(_.map(_.groupBy(items, 'pinyin'), (v, k) => ({
      key: k,
      list: v,
    })), 'key'));

    done();
  });
});
