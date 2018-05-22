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
  projectNames,
  businessUnits,
}) => (
  <Form layout="horizontal" className={styles.stepForm}>
    <Form.Item {...formItemLayout} label="eid">
      {getFieldDecorator('eid', {
              rules: [
                {
                  required: true,
                  message: '请输入您的eid',
                },
              ],
            })(<Input placeholder="请输入eid" />)}
    </Form.Item>
    <Form.Item {...formItemLayout} label="姓名">
      {getFieldDecorator('fullname', {
            })(<Input placeholder="请输入eid" />)}
    </Form.Item>
    <Form.Item {...formItemLayout} label="员工号 Sap Number">
      {getFieldDecorator('sapNumber', {
            })(<Input placeholder="请输入员工号" />)}
    </Form.Item>
    <Form.Item {...formItemLayout} label="项目">
      {getFieldDecorator('projectName', {
              rules: [
                {
                  required: true,
                  message: '请输入或选择项目',
                },
              ],
            })(
              <Select
                mode="combobox"
                style={{ width: '100%' }}
                placeholder="请输入或选择项目"
              >
                {
                  projectNames.map(d => (
                    <Option key={d}>{d}</Option>
                  ))
                }
              </Select>
            )}
    </Form.Item>
    <Form.Item {...formItemLayout} label="部门">
      {getFieldDecorator('businessUnit', {
              rules: [
                {
                  required: true,
                  message: '请输入部门',
                },
              ],
            })(
              <Select
                mode="combobox"
                style={{ width: '100%' }}
                placeholder="请输入或选择部门"
              >
                {
                  businessUnits.map(d => (
                    <Option key={d}>{d}</Option>
                  ))
                }
              </Select>
            )}
    </Form.Item>
    <Form.Item {...formItemLayout} label="办公地点">
      {getFieldDecorator('location', {
              rules: [
                {
                  required: true,
                  message: '请输入办公地点',
                },
              ],
            })(<Input placeholder="请输入办公地点" />)}
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
