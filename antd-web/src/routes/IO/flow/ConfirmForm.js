import React from 'react';
import {
  Button,
  Divider,
  Form,
  Input,
  Switch,
} from 'antd';

const ConfirmForm = ({
  styles,
  data,
  getFieldDecorator,
  onValidateForm,
  formItemLayout,
  onPrev,
  submitting,
}) => (
  <Form layout="horizontal" className={styles.stepForm}>
    <Form.Item {...formItemLayout} label="EID">
      {data.eid}
    </Form.Item>
    <Form.Item {...formItemLayout} label="姓名">
      {data.fullname}
    </Form.Item>
    <Form.Item {...formItemLayout} label="员工号 Sap Number">
      {data.sapNumber}
    </Form.Item>
    <Form.Item {...formItemLayout} label="项目">
      {data.projectName}
    </Form.Item>
    <Form.Item {...formItemLayout} label="部门">
      {data.businessUnit}
    </Form.Item>
    <Form.Item {...formItemLayout} label="办公地点">
      {data.location}
    </Form.Item>
    <Form.Item {...formItemLayout} label="备注">
      {data.remarks}
    </Form.Item>
    <Divider style={{ margin: '24px 0' }} />
    <Form.Item {...formItemLayout} label="资产编号">
      {getFieldDecorator('assetTag', {
              rules: [
                {
                  required: true,
                  message: '请输入资产编号',
                },
              ],
            })(<Input placeholder="请输入资产编号" />)}
    </Form.Item>
    <Form.Item {...formItemLayout} label="序列号">
      {getFieldDecorator('serialTag', {
              rules: [
                {
                  required: true,
                  message: '请输入序列号',
                },
              ],
            })(<Input placeholder="请输入序列号" />)}
    </Form.Item>
    <Form.Item {...formItemLayout} label="笔记本型号">
      {getFieldDecorator('laptopModel', {
              rules: [
                {
                  required: true,
                  message: '请输入笔记本型号',
                },
              ],
            })(<Input placeholder="请输入笔记本型号" />)}
    </Form.Item>
    <Form.Item {...formItemLayout} label="电源适配器&电源线" >
      {getFieldDecorator('acPowerAdapter')(
        <Switch />
          )}
    </Form.Item>
    <Form.Item {...formItemLayout} label="电脑锁" >
      {getFieldDecorator('securityCable')(
        <Switch />
        )}
    </Form.Item>
    <Form.Item {...formItemLayout} label="电脑包" >
      {getFieldDecorator('bag')(
        <Switch />
        )}
    </Form.Item>
    <Form.Item {...formItemLayout} label="鼠标" >
      {getFieldDecorator('mouse')(
        <Switch />
        )}
    </Form.Item>
    <Form.Item {...formItemLayout} label="网线" >
      {getFieldDecorator('lanCable')(
        <Switch />
        )}
    </Form.Item>
    <Divider style={{ margin: '24px 0' }} />
    <Form.Item
      style={{ marginBottom: 8 }}
      wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
      label=""
    >
      <Button onClick={onPrev} style={{ margin: 8 }}>
        上一步
      </Button>
      <Button type="primary" onClick={onValidateForm} loading={submitting}>
        下一步
      </Button>
    </Form.Item>
  </Form>
);

export default ConfirmForm;
