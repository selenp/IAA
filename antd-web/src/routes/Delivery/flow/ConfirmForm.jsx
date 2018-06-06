import React from 'react';
import {
  Button,
  Divider,
  Form,
  Input,
  Radio,
  Select,
  Switch,
} from 'antd';

const RadioGroup = Radio.Group;
const { Option } = Select;

const ConfirmForm = ({
  styles,
  data,
  getFieldDecorator,
  getFieldValue,
  onValidateForm,
  formItemLayout,
  onPrev,
  submitting,
  notebookModels,
  monitorSizes,
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
      {`${data.locationBuilding}-${data.locationFloor}-${data.locationSeat}`}
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
    {
      data.machineType ? (
        <Form.Item {...formItemLayout} label="机型">
          {data.machineType}
        </Form.Item>
      ) : (
        <Form.Item {...formItemLayout} label="机型">
          {getFieldDecorator('machineType', {
            rules: [
              {
                required: true,
                message: '请选择台式机或者笔记本',
              },
            ],
            })(
              <RadioGroup >
                <Radio value="laptop">台式机</Radio>
                <Radio value="notebook">笔记本</Radio>
              </RadioGroup>
          )}
        </Form.Item>
      )}
    {
      getFieldValue('machineType') === 'laptop' &&
        (
        <Form.Item
          {...formItemLayout}
          label="显示器"
        >
          {getFieldDecorator('monitorSize', {
          rules: [
            {
              required: true,
              message: '请输入显示器的尺寸，可以输入多个',
            },
          ],
            })(
              <Select
                mode="tags"
                style={{ width: '100%' }}
                placeholder="19, 21"
              >
                {
                  monitorSizes.map(d => (
                    <Option key={d}>{d}</Option>
                  ))
                }
              </Select>
          )}
        </Form.Item>
)
    }
    {
      getFieldValue('machineType') === 'notebook' &&
        (
        <Form.Item
          {...formItemLayout}
          label="笔记本型号"
        >
          {getFieldDecorator('notebookModel', {
          rules: [
            {
              required: true,
              message: '请输入笔记本型号',
            },
          ],
            })(
              <Select
                mode="combobox"
                style={{ width: '100%' }}
                placeholder="请输入或选择笔记本型号"
              >
                {
                  notebookModels.map(d => (
                    <Option key={d}>{d}</Option>
                  ))
                }
              </Select>
          )}
        </Form.Item>
)
    }
    {
      getFieldValue('machineType') === 'notebook' &&
      (
      <Form.Item
        {...formItemLayout}
        label="电源适配器&电源线"
      >
        {getFieldDecorator('acPowerAdapter')(
          <Switch />
    )}
      </Form.Item>
)
    }
    {
      getFieldValue('machineType') === 'notebook' &&
      (
      <Form.Item {...formItemLayout} label="电脑锁" >
        {getFieldDecorator('securityCable')(
          <Switch />
        )}
      </Form.Item>
)
    }
    {
      getFieldValue('machineType') === 'notebook' &&
      (
      <Form.Item {...formItemLayout} label="电脑包" >
        {getFieldDecorator('bag')(
          <Switch />
        )}
      </Form.Item>
)
  }
    {
      getFieldValue('machineType') === 'notebook' &&
      (
      <Form.Item {...formItemLayout} label="鼠标" >
        {getFieldDecorator('mouse')(
          <Switch />
        )}
      </Form.Item>
)
  }
    {
      getFieldValue('machineType') === 'laptop' &&
      (
      <Form.Item {...formItemLayout} label="键盘鼠标" >
        {getFieldDecorator('mouseKeyboard')(
          <Switch />
        )}
      </Form.Item>
)
  }
    {
      getFieldValue('machineType') === 'laptop' &&
      (
      <Form.Item {...formItemLayout} label="网线" >
        {getFieldDecorator('lanCable')(
          <Switch />
        )}
      </Form.Item>
)
    }
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
