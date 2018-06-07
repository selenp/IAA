import React from 'react';
import { Button, Divider, Radio, Form, Select } from 'antd';

const RadioGroup = Radio.Group;

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
    <Form.Item {...formItemLayout} label="自EID">
      {data.fromEid}
    </Form.Item>
    <Form.Item {...formItemLayout} label="至EID">
      {data.toEid}
    </Form.Item>
    <Form.Item {...formItemLayout} label="备注">
      {data.remarks}
    </Form.Item>
    <Divider style={{ margin: '24px 0' }} />
    <Form.Item {...formItemLayout} label="资产编号">
      {getFieldDecorator('assetTags', {
        rules: [
          {
            required: true,
            message: '请输入资产编号',
          },
        ],
      })(
        <Select mode="tags" notFoundContent={null} placeholder="输入一个资产编号后，请按Enter键" />
      )}
    </Form.Item>
    <Form.Item {...formItemLayout} label="取还">
      {getFieldDecorator('status', {
        rules: [
          {
            required: true,
            message: '请选择领取或者归还',
          },
        ],
      })(
        <RadioGroup>
          <Radio value="borrow">领取</Radio>
          <Radio value="return">归还</Radio>
        </RadioGroup>
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
        保存
      </Button>
    </Form.Item>
  </Form>
);

export default ConfirmForm;
