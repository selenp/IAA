import React from 'react';
import { translate } from "react-i18next";
import { Button, Divider, Radio, Form, Select } from 'antd';

const RadioGroup = Radio.Group;

const ConfirmForm = ({
  t,
  styles,
  data,
  getFieldDecorator,
  onValidateForm,
  formItemLayout,
  onPrev,
  submitting,
}) => (
  <Form layout="horizontal" className={styles.stepForm}>
    <Form.Item {...formItemLayout} label={t('自EID')}>
      {data.fromEid}
    </Form.Item>
    <Form.Item {...formItemLayout} label={t('至EID')}>
      {data.toEid}
    </Form.Item>
    <Form.Item {...formItemLayout} label={t('备注')}>
      {data.remarks}
    </Form.Item>
    <Divider style={{ margin: '24px 0' }} />
    <Form.Item {...formItemLayout} label={t('资产编号')}>
      {getFieldDecorator('assetTags', {
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
        <Select mode="tags" notFoundContent={null} maxLength={100} placeholder={t('输入一个资产编号后，请按Enter键')} />
      )}
    </Form.Item>
    <Form.Item {...formItemLayout} label={t('取还')}>
      {getFieldDecorator('status', {
        rules: [
          {
            required: true,
            message: t('请选择领取或者归还'),
          },
        ],
      })(
        <RadioGroup>
          <Radio value="borrow">{t('领取')}</Radio>
          <Radio value="return">{t('归还')}</Radio>
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
        {t('返回')}
      </Button>
      <Button type="primary" onClick={onValidateForm} loading={submitting}>
        {t('保存')}
      </Button>
    </Form.Item>
  </Form>
);

export default translate("translations")(ConfirmForm);
