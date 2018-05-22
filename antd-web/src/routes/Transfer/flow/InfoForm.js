import React from 'react';
import {
  DatePicker,
  Form,
  Input,
  Select,
  Button,
} from 'antd';

const { TextArea } = Input;

const { Option } = Select;


const InfoForm = ({
  styles,
  getFieldDecorator,
  onValidateForm,
  formItemLayout,
  currentUser,
}) => (
  <Form layout="horizontal" className={styles.stepForm}>
    <Form.Item {...formItemLayout} label="自eid">
      {getFieldDecorator('ownerEid', {
            initialValue: currentUser.userid,
              rules: [
                {
                  required: true,
                  message: '请输入eid',
                },
              ],
      })(<Input placeholder="请输入eid" />)}
    </Form.Item>
    <Form.Item {...formItemLayout} label="至eid">
      {getFieldDecorator('eid', {
              rules: [
                {
                  required: true,
                  message: '请输入eid',
                },
              ],
            })(<Input placeholder="请输入eid" />)}
    </Form.Item>
    <Form.Item
      {...formItemLayout}
      label={
        <span>
                备注
          <em className={styles.optional}>
                  （选填）
          </em>
        </span>
            }
    >
      {getFieldDecorator('remarks')(
        <TextArea
          style={{ minHeight: 32 }}
          placeholder="如有必要， 请输入一些备注信息"
          rows={4}
        />
            )}
    </Form.Item>
    <Form.Item
      wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span,
              },
            }}
      label=""
    >
      <Button type="primary" onClick={onValidateForm}>
              下一步
      </Button>
    </Form.Item>
  </Form>
);

export default InfoForm;
