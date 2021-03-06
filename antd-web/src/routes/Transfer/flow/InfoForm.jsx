import React from 'react';
import { translate } from "react-i18next";
import {
  Form,
  Input,
  Button,
} from 'antd';

const { TextArea } = Input;
const { Search } = Input;

const InfoForm = ({
  t,
  task,
  ldap2,
  styles,
  data,
  getFieldDecorator,
  onValidateForm,
  formItemLayout,
  currentUser,
  handleSeachEid1,
  handleSeachEid2,
  handleInitLdap1,
  handleInitLdap2,
}) => (
  <Form layout="horizontal" className={styles.stepForm}>
    <Form.Item {...formItemLayout} label={t('自EID')}>
      {getFieldDecorator('fromEid', {
        initialValue: currentUser.userid,
        rules: [
          {
            required: true,
            message: t('请输入EID'),
          },
        ],
      })(
        <Search
          maxLength={100}
          placeholder={t('请输入EID')}
          onSearch={value => handleSeachEid1(value)}
          onBlur={obj => handleSeachEid1(obj.target.value)}
          onChange={() => handleInitLdap1()}
        />
      )}
    </Form.Item>
    <Form.Item {...formItemLayout} label={t('姓名')}>
      {ldap2.data1.cn ? ldap2.data1.cn : (<div style={{color:'red', fontStyle:'italic'}}> [{t('点击EID的“查询”按钮进行验证')}] </div>)}
    </Form.Item>
    <Form.Item {...formItemLayout} label={t('至EID')}>
      {getFieldDecorator('toEid', {
        initialValue: task.eid,
        rules: [
          {
            required: true,
            message: t('请输入EID'),
          },
        ],
      })(
        <Search
          maxLength={100}
          placeholder={t('请输入EID')}
          onSearch={value => handleSeachEid2(value)}
          onBlur={obj => handleSeachEid2(obj.target.value)}
          onChange={() => handleInitLdap2()}
        />
      )}
    </Form.Item>
    <Form.Item {...formItemLayout} label={t('姓名')}>
      {ldap2.data2.cn ? ldap2.data2.cn : (<div style={{color:'red', fontStyle:'italic'}}> [{t('点击EID的“查询”按钮进行验证')}] </div>)}
    </Form.Item>
    <Form.Item
      {...formItemLayout}
      label={
        <span>
          {t('备注')}
        </span>
      }
    >
      {getFieldDecorator('remarks', {
      initialValue: data.remarks,
    })(
      <TextArea style={{ minHeight: 32 }} placeholder={t('如有必要， 请输入一些备注信息')} rows={4} />
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
        {t('下一步')}
      </Button>
    </Form.Item>
  </Form>
);

export default translate("translations")(InfoForm);
