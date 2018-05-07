const config = require('./config');
const mongoose = require('mongoose');

mongoose.set('debug', true);

const options = {
  autoIndex: false,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  poolSize: 10,
  bufferMaxEntries: 0,
};

mongoose.connect(config.mongoose.connect, options);
mongoose.Promise = global.Promise;
const conn = exports.conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'mongo connection error.'));

// User:用户一览
const userSchema = mongoose.Schema({
  _id: String,  // mobile
  nickName: String,
  avatarUrl: {
    type: String,
    default: 'http://youdewan-test.oss-cn-hangzhou.aliyuncs.com/wx/tabbar-icon/my-o.svg',
  },
  role: {
    type: String,
    default: 'user',
  }, //'user' or 'super_admin'
  memo: String,
  delete_flag: {
    type: Boolean,
    default: false,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
});

//Equipment表
const equipmentSchema = mongoose.Schema({
  owner: {
    type: String,
    ref: 'User',
    index: true,
  },
  cover: String,
  subject: String,
  abstract: String,
  items: [{
    mobile: String,  // mobile
    user: {
      type: String,
      ref: 'User',
      index: true,
    }, // 可以为空，以_id为准
    equipmentName: String,
    pinyin: {
      type: String,
      default: '#',
    }, // 拼音首字母，排序用
    equipmentTitle: String,
    equipmentTitle2: String,
    properties: mongoose.Schema.Types.Mixed, // [{prop_key, prop_value}]
    create_date: {
      type: Date,
      default: Date.now,
    },
  }],
  create_date: {
    type: Date,
    default: Date.now,
  },
});


exports.User = mongoose.model('User', userSchema);
exports.Equipment = mongoose.model('Equipment', equipmentSchema);
