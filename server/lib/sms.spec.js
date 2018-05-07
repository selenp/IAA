/**
 * aliyun sms服务
 */
const config = require('../config');

const SMSClient = require('@alicloud/sms-sdk');
//初始化sms_client
const smsClient = new SMSClient(config.aliyun.sms);
//发送短信
smsClient.sendSMS({
  PhoneNumbers: '18624357886',
  SignName: config.title,
  TemplateCode: 'SMS_133977105',
  TemplateParam: '{"code":"23457"}',
}).then((res) => {
  const { Code } = res;
  if (Code === 'OK') {
    //处理返回参数
    console.log(res);
  }
}).catch((err) => {
  console.log(err);
});
