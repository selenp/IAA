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
    <Form.Item {...formItemLayout} label="*资产编号">
      {data.assetTag}
    </Form.Item>
    <Form.Item {...formItemLayout} label="*序列号">
      {data.serialTag}
    </Form.Item>
    <Form.Item {...formItemLayout} label="*笔记本型号">
      {data.laptopModel}
    </Form.Item>
    <Form.Item {...formItemLayout} label="电源适配器&电源线" >
      {data.acPowerAdapter?'Yes':'No'}
    </Form.Item>
    <Form.Item {...formItemLayout} label="电脑锁" >
      {data.securityCable?'Yes':'No'}
    </Form.Item>
    <Form.Item {...formItemLayout} label="电脑包" >
      {data.bag?'Yes':'No'}
    </Form.Item>
    <Form.Item {...formItemLayout} label="鼠标" >
      {data.mouse?'Yes':'No'}
    </Form.Item>
    <Form.Item {...formItemLayout} label="网线" >
      {data.lanCable?'Yes':'No'}
    </Form.Item>
    <Divider style={{ margin: '24px 0' }} />
    <Form.Item {...formItemLayout} label="电源适配器&电源线" >
      {getFieldDecorator('returnAcPowerAdapter')(
        <Switch />
          )}
    </Form.Item>
    <Form.Item {...formItemLayout} label="电脑锁" >
      {getFieldDecorator('returnSecurityCable')(
        <Switch />
        )}
    </Form.Item>
    <Form.Item {...formItemLayout} label="电脑包" >
      {getFieldDecorator('returnBag')(
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
      <Button type="primary" onClick={onValidateForm} loading={submitting}>
        下一步
      </Button>
    </Form.Item>
  </Form>
);

export default ConfirmForm;
