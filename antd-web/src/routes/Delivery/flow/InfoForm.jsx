import React from 'react';
import { translate } from "react-i18next";
import {
  Form,
  Input,
  Select,
  Button,
} from 'antd';

const { TextArea } = Input;
const { Search } = Input;

const { Option } = Select;


const InfoForm = ({
  t,
  ldap,
  styles,
  data,
  getFieldDecorator,
  onValidateForm,
  formItemLayout,
  projectNames,
  businessUnits,
  locationBuildings,
  handleSeachEid,
  handleInitLdap,
}) => (
  <Form layout="horizontal" className={styles.stepForm}>
    <Form.Item {...formItemLayout} label="EID">
      {getFieldDecorator('eid', {
        initialValue: data.eid,
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
            onSearch={value => handleSeachEid(value)}
            onBlur={obj => handleSeachEid(obj.target.value)}
            onChange={() => handleInitLdap()}
          />
      )}
    </Form.Item>
    <Form.Item {...formItemLayout} label={t('姓名')}>
      {ldap.data.cn ? ldap.data.cn : (<div style={{color:'red', fontStyle:'italic'}}> [{t('点击EID的“查询”按钮进行验证')}] </div>)}
    </Form.Item>
    <Form.Item {...formItemLayout} label={t('部门')}>
      {getFieldDecorator('businessUnit', {
        initialValue: data.businessUnit,
              rules: [
                {
                  required: true,
                  message: t('请输入部门'),
                },
              ],
            })(
              <Select
                mode="combobox"
                style={{ width: '100%' }}
                maxLength={100}
                placeholder={t('请输入或选择部门')}
              >
                {
                  businessUnits.map(d => (
                    <Option key={d}>{d}</Option>
                  ))
                }
              </Select>
            )}
    </Form.Item>
    <Form.Item {...formItemLayout} label={t('项目')}>
      {getFieldDecorator('projectName', {
        initialValue: data.projectName,
              rules: [
                {
                  message: t('请输入或选择项目'),
                },
              ],
            })(
              <Select
                mode="combobox"
                style={{ width: '100%' }}
                maxLength={100}
                placeholder={t('请输入或选择项目')}
              >
                {
                  projectNames.map(d => (
                    <Option key={d}>{d}</Option>
                  ))
                }
              </Select>
            )}
    </Form.Item>
    <Form.Item {...formItemLayout} label={t('楼号')}>
      {getFieldDecorator('locationBuilding', {
        initialValue: data.locationBuilding,
              rules: [
                {
                  message: t('请输入您办公地点的楼号'),
                },
              ],
            })(
              <Select
                mode="combobox"
                style={{ width: '100%' }}
                maxLength={100}
                placeholder={t('请输入您办公地点的楼号')}
              >
                {
                  locationBuildings.map(d => (
                    <Option key={d}>{d}</Option>
                  ))
                }
              </Select>
            )}
    </Form.Item>
    <Form.Item {...formItemLayout} label={t('座位号')}>
      {getFieldDecorator('locationSeat', {
        initialValue: data.locationSeat,
              rules: [
                {
                  message: t('请输入您办公地点的座位号'),
                },
              ],
            })(<Input maxLength={100} placeholder={t('请输入您办公地点的座位号')} />)}
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
              <TextArea
                style={{ minHeight: 32 }}
                placeholder={t('如有必要， 请输入一些备注信息')}
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
        {t('下一步')}
      </Button>
    </Form.Item>
  </Form>
);

export default translate("translations")(InfoForm);
