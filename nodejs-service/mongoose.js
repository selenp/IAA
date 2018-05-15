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
  _id: String,  // eid
  mobile: String,
  fullname: String,
  avatarUrl: {
    type: String,
    default: 'http://youdewan-test.oss-cn-hangzhou.aliyuncs.com/wx/tabbar-icon/my-o.svg',
  },
  role: {
    type: String,
    default: 'employee',
    enum: ['employee', 'super_admin'],
  }, //'employee' or 'super_admin'
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

//Workstation IO表
const workstationSchema = mongoose.Schema({
  take_eid: String,
  status: {
    type: String,
    default: 'take',
    enum: ['take', 'return'],
  }, //
  department: String,
  serial_no: String,
  computer_name: String,
  project_name: String,
  mouse: Number,
  keyboard: Number,
  bag: Number,
  power: Number,
  lock: Number,
  display: Number,
  vga_adapter: Number,
  lan_cable: Number,
  it_eid: Number,
  memo: String,
  create_date: {
    type: Date,
    default: Date.now,
  },
  return_eid: String,
  return_date: {
    type: Date,
  },
});

exports.User = mongoose.model('User', userSchema);
exports.Workstation = mongoose.model('Workstation', workstationSchema);
