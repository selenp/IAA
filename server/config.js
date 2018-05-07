module.exports = {
  host: '127.0.0.1',
  port: 3000,
  session_secret: '19f508c900d840c408202e9e78a166bc',

  tmpdir: '/work/tmp',
  saltRounds: 10,

  id: 'equipment',
  title: '设备收发管理',
  desc: '抢红包',
  url: 'https://test.tttalk.org',

  app: {
    id: 'wxddb62c6db1df9080',
    secret: 'c8e44405036e9141cb1f5fba0bb48652',
  },

  redis: {
    url: 'redis://:huarui1111@localhost:6379',
    redis_retry_strategy: (options) => {
      if (options.error && options.error.code === 'ECONNREFUSED') {
        return new Error('The server refused the connection');
      }
      if (options.total_retry_time > 1000 * 60 * 60) {
        return new Error('Retry time exhausted');
      }
      if (options.times_connected > 10) {
        return undefined;
      }
      // reconnect after
      return Math.max(options.attempt * 100, 3000);
    },
  },
  smtp: 'smtp://kefu%40ydw123.cn:AliTest12301@smtp.ydw123.cn',

  pageSize: 20,

  mongoose: {
    connect: 'mongodb://localhost/equipment',
  },
  aliyun: {
    cdn_prefix: '//cdn.bootcss.com',
    // cdn_prefix: '/',
    static_content: '//file.yidalize.com',
    sms: {
      accessKeyId: 'vS5XyoMoM30ZmRIA',
      secretAccessKey: 'WLh8RUvzzVrPEbQbGGPDPzjl7wt0fd',
    },
  },
};
