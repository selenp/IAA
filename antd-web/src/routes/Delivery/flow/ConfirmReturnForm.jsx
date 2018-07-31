import React from 'react';
import { translate } from "react-i18next";
import {
  Button,
  Divider,
  Form,
  Input,
  Radio,
  Select,
  Switch,
} from 'antd';

const { Option } = Select;
const RadioGroup = Radio.Group;

const ConfirmForm = ({
  t,
  styles,
  data,
  getFieldDecorator,
  getFieldValue,
  onValidateForm,
  formItemLayout,
  onPrev,
  submitting,
  laptopModels,
  monitorSizes,
}) => (
  <Form layout="horizontal" className={styles.stepForm}>
    <Form.Item {...formItemLayout} label={t('EID')}>
      {data.eid}
    </Form.Item>
    <Form.Item {...formItemLayout} label={t('项目')}>
      {data.projectName}
    </Form.Item>
    <Form.Item {...formItemLayout} label={t('部门')}>
      {data.businessUnit}
    </Form.Item>
    <Form.Item {...formItemLayout} label={t('楼号')}>
      {`${data.locationBuilding || ''}-${data.locationSeat || ''}`}
    </Form.Item>
    <Form.Item {...formItemLayout} label={t('备注')}>
      {data.remarks}
    </Form.Item>
    <Divider style={{ margin: '24px 0' }} />
    {
      data.assetTag ? (
        <Form.Item {...formItemLayout} label={t('资产编号')}>
          {data.assetTag}
        </Form.Item>
      ) : data.machineType !== 'peripheral' ? (
        <Form.Item {...formItemLayout} label={t('资产编号')}>
          {getFieldDecorator('assetTag', {
            rules: [
              {
                required: true,
                message: t('请输入资产编号'),
              },
              {
                pattern: /^[A-Za-z0-9-_,]+$/,
                message: t('请输入资产编号'),
              },
            ],
            })(
              <Input maxLength={100} placeholder={t('请输入资产编号')} />
          )}
        </Form.Item>
      ) : ''}
    {
    data.serialTag ? (
      <Form.Item {...formItemLayout} label={t('序列号')}>
        {data.serialTag}
      </Form.Item>
    ) : data.machineType !== 'peripheral' ? (
      <Form.Item {...formItemLayout} label={t('序列号')}>
        {getFieldDecorator('serialTag', {
          rules: [
            {
              required: true,
              message: t('请输入序列号'),
            },
          ],
        })(<Input maxLength={100} placeholder={t('请输入序列号')} />)}
      </Form.Item>
    ) : ''}
    {
    data.machineType ? (
      <Form.Item {...formItemLayout} label={t('机型')}>
        {data.machineType}
      </Form.Item>
    ) : (
      <Form.Item {...formItemLayout} label={t('机型')}>
        {getFieldDecorator('machineType', {
          rules: [
            {
              required: true,
              message: t('请选择台式机或者笔记本'),
            },
          ],
          })(
            <RadioGroup >
              <Radio value="desktop">{t('台式机')}</Radio>
              <Radio value="laptop">{t('笔记本')}</Radio>
              <Radio value="peripheral">{t('配件')}</Radio>
            </RadioGroup>
        )}
      </Form.Item>
    )}
    {
    data.serialTag || data.machineType === 'peripheral' ? (
      <Form.Item {...formItemLayout} label={t('配件')}>
        {data.peripheral}
      </Form.Item>
    ) : (
      <Form.Item {...formItemLayout} label={t('配件')}>
        {getFieldDecorator('peripheralModel', {
          rules: [
            {
              required: true,
              message: t('请输入配件信息'),
            },
          ],
        })(<Input maxLength={100} placeholder={t('请输入配件信息')} />)}
      </Form.Item>
    )}
    {
    (getFieldValue('machineType') === 'laptop' || data.machineType === 'laptop') && (
      data.laptopModel ? (
        <Form.Item {...formItemLayout} label={t('笔记本型号')}>
          {data.laptopModel}
        </Form.Item>
      ) : (
        <Form.Item {...formItemLayout} label={t('机型')}>
          {getFieldDecorator('laptopModel', {
            rules: [
              {
                message: t('请输入笔记本型号'),
              },
            ],
            })(
              <Select
                mode="combobox"
                style={{ width: '100%' }}
                maxLength={100}
                placeholder={t('请输入或选择笔记本型号')}
              >
                {
                laptopModels.map(d => (
                  <Option key={d}>{d}</Option>
                ))
              }
              </Select>
          )}
        </Form.Item>
      ))}
    {data.assetTag && data.machineType === 'desktop' && (
    <Form.Item {...formItemLayout} label={t('显示器')} >
        {data.monitorSize}
    </Form.Item>
  )}
    {data.assetTag && data.machineType === 'laptop' && (
    <Form.Item {...formItemLayout} label={t('电源适配器&电源线')} >
      {data.acPowerAdapter?'Yes':'No'}
    </Form.Item>
  )}
    {data.assetTag && data.machineType === 'laptop' && (
    <Form.Item {...formItemLayout} label={t('电脑锁')} >
      {data.securityCable?'Yes':'No'}
    </Form.Item>
  )}
    {data.assetTag && data.machineType === 'laptop' && (
    <Form.Item {...formItemLayout} label={t('电脑包')}>
      {data.bag?'Yes':'No'}
    </Form.Item>
  )}
    {data.assetTag && data.machineType === 'laptop' && (
    <Form.Item {...formItemLayout} label={t('鼠标')}>
      {data.mouse?'Yes':'No'}
    </Form.Item>
  )}
    {data.assetTag && data.machineType === 'desktop' && (
    <Form.Item {...formItemLayout} label={t('键盘鼠标')} >
      {data.mouseKeyboard?'Yes':'No'}
    </Form.Item>
  )}
    {data.assetTag && data.machineType === 'desktop' && (
    <Form.Item {...formItemLayout} label={t('网线')} >
      {data.lanCable?'Yes':'No'}
    </Form.Item>
  )}
    {data.assetTag && (
    <Form.Item {...formItemLayout} label={t('配件')} >
      {data.peripheralModel?'Yes':'No'}
    </Form.Item>
  )}
    {
    !data.assetTag || data.machineType === 'peripheral' && <div>{t('没有借取记录')}</div>
  }
    <Divider style={{ margin: '24px 0' }} />
    {
      (getFieldValue('machineType') === 'desktop' || data.machineType === 'desktop') &&
        (
          <Form.Item
            {...formItemLayout}
            label={t('显示器')}
          >
            {getFieldDecorator('returnMonitorSize', {
              initialValue: data.monitorSize,
              rules: [
                {
                  required: true,
                  message: t('请输入显示器的尺寸，可以输入多个'),
                },
              ],
              })(
                <Select
                  mode="tags"
                  style={{ width: '100%' }}
                  maxLength={100}
                  placeholder="19, 21*2"
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
    (getFieldValue('machineType') === 'laptop' || data.machineType === 'laptop') &&
      (
        <Form.Item
          {...formItemLayout}
          label={t('电源适配器&电源线')}
        >
          {getFieldDecorator('returnAcPowerAdapter')(
            <Switch />
          )}
        </Form.Item>
      )
  }
    {
    (getFieldValue('machineType') === 'laptop' || data.machineType === 'laptop') &&
      (
        <Form.Item {...formItemLayout} label={t('电脑锁')} >
          {getFieldDecorator('returnSecurityCable')(
            <Switch />
          )}
        </Form.Item>
      )
  }
    {
    (getFieldValue('machineType') === 'laptop' || data.machineType === 'laptop') &&
      (
        <Form.Item {...formItemLayout} label={t('电脑包')}>
          {getFieldDecorator('returnBag')(
            <Switch />
          )}
        </Form.Item>
      )
  }
    {
    (getFieldValue('machineType') === 'laptop' || data.machineType === 'laptop') &&
      (
        <Form.Item {...formItemLayout} label={t('鼠标')} >
          {getFieldDecorator('returnMouse')(
            <Switch />
          )}
        </Form.Item>
      )
  }
    {
    (getFieldValue('machineType') === 'desktop' || data.machineType === 'desktop') &&
      (
        <Form.Item {...formItemLayout} label={t('键盘鼠标')} >
          {getFieldDecorator('returnMouseKeyboard')(
            <Switch />
          )}
        </Form.Item>
      )
  }
    {
    (getFieldValue('machineType') === 'desktop' || data.machineType === 'desktop') &&
      (
        <Form.Item {...formItemLayout} label={t('网线')} >
          {getFieldDecorator('returnLanCable')(
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
      {onPrev && (
      <Button onClick={onPrev} style={{ margin: 8 }}>
        {t('返回')}
      </Button>
    )}
      <Button type="primary" onClick={onValidateForm} loading={submitting}>
        {t('保存')}
      </Button>
    </Form.Item>
  </Form>
);

export default translate("translations")(ConfirmForm);
