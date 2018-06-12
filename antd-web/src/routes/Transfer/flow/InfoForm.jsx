import React from 'react';
import { translate } from "react-i18next";
import { DatePicker, Form, Input, Select, Button } from 'antd';

const { TextArea } = Input;

const { Option } = Select;

const InfoForm = ({
  t,
  styles,
  getFieldDecorator,
  onValidateForm,
  formItemLayout,
  currentUser,
}) => (
  <Form layout="horizontal" className={styles.stepForm}>
    <Form.Item {...formItemLayout} label={t("自EID")}>
      {getFieldDecorator('fromEid', {
        initialValue: currentUser.userid,
        rules: [
          {
            required: true,
            message: t('请输入EID'),
          },
        ],
      })(<Input placeholder={t("请输入EID")} />)}
    </Form.Item>
    <Form.Item {...formItemLayout} label={t("至EID")}>
      {getFieldDecorator('toEid', {
        rules: [
          {
            required: true,
            message: t('请输入EID'),
          },
        ],
      })(<Input placeholder={t("请输入EID")} />)}
    </Form.Item>
    <Form.Item
      {...formItemLayout}
      label={
        <span>
          备注
          <em className={styles.optional}>{t("选填")}</em>
        </span>
      }
    >
      {getFieldDecorator('remarks')(
        <TextArea style={{ minHeight: 32 }} placeholder={t("如有必要， 请输入一些备注信息")} rows={4} />
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
        {t("下一步")}
      </Button>
    </Form.Item>
  </Form>
);

export default translate("translations")(InfoForm);
