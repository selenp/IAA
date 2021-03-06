import React, { PureComponent } from 'react';
import { translate } from "react-i18next";
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Button,
  Card,
  Form,
  Input,
  Select,
} from 'antd';
import { groupBy, map } from 'lodash';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import { FILE_URL } from '../../utils/utils';

const { Search } = Input;
const { Option } = Select;

const FormItem = Form.Item;

const { Description } = DescriptionList;

const avatars = [
  `${FILE_URL}/BiazfanxmamNRoxxVxka.png`,
  `${FILE_URL}/cnrhVkzwxjPwAaCfPbdc.png`,
  `${FILE_URL}/gaOngJwsRYRaVAuXXcmB.png`,
  `${FILE_URL}/ubnKSIfAJTxIgXOKlciN.png`,
  `${FILE_URL}/WhxKECPNujWoWEFNdnJE.png`,
  `${FILE_URL}/jZUIxmJycoymBprLOUbT.png`,
  `${FILE_URL}/psOgztMplJMGpVEqfcgF.png`,
  `${FILE_URL}/ZpBqSxLxVEXfcUNoPKrz.png`,
  `${FILE_URL}/laiEnJdGHVOhJrUShBaJ.png`,
  `${FILE_URL}/UrQsqscbKEpNuJcvBZBu.png`,
];

@connect(({ admin, ldap, loading, allDictionaries }) => ({
  admin,
  ldap,
  loading: loading.effects['admin/fetch'],
  submitting: loading.effects['admin/submit'],
  roles: map(groupBy(allDictionaries.data, 'category').role, v => v.data),
}))
@Form.create()
class Admin extends PureComponent {
  constructor(props) {
    super(props);

    if (this.props.match.params.id === 'new') {
      this.state = {
        editing: true,
        data: {
          userid: "",
        },
      };
    } else {
      this.state = {
        editing: false,
        data: null,
      };
    }
  }

  componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      this.props.dispatch({
        type: 'admin/fetch',
        id: this.props.match.params.id,
      });
    }
  }
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'ldap/initData',
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { t } = this.props;
    const { form, ldap, dispatch, match } = this.props;
    if (!ldap.data.cn) {
      return;
    }

    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'admin/submit',
          payload: {
            ...values,
            roles: values.roles.join(','),
            avatar: avatars[Math.floor(Math.random()*avatars.length)],
            id: match.params.id === 'new' ? null : match.params.id,
          },
          t,
        });
      }
    });
  }

  handleSeachEid = (eid) => {
    if (eid) {
      this.props.dispatch({
        type: 'ldap/search',
        uid: eid,
      });
    }
  }
  handleInitLdap = () => {
    this.props.dispatch({
      type: 'ldap/initData',
    });
  }

  renderView() {
    const { t } = this.props;
    const { admin: { data }, ldap } = this.props;

    return data && (
      <Card bordered={false}>
        <DescriptionList size="large" style={{ marginBottom: 32 }}>
          <Description term={t('姓名')}>{ldap.data.uid}</Description>
          <Description term={t('eid')}>{data.userid}</Description>
          <Description term={t('角色')}>{data.roles}</Description>
        </DescriptionList>
      </Card>
    );
  }

  renderEdit() {
    const { t } = this.props;
    const { submitting, roles, ldap} = this.props;
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <Card bordered={false}>
        <Form
          onSubmit={this.handleSubmit}
          style={{ marginTop: 8 }}
        >
          <FormItem
            {...formItemLayout}
            label={<span>EID</span>}
          >
            {getFieldDecorator('userid', {
          initialValue: this.state.data.userid,
          rules: [{
            required: true,
            message:t('请输入EID'),
          }],
        })(
          <Search
            maxLength={100}
            placeholder={t('请输入EID')}
            onSearch={value => this.handleSeachEid(value)}
            onBlur={obj => this.handleSeachEid(obj.target.value)}
            onChange={() => this.handleInitLdap()}
          />
        )}
          </FormItem>
          <Form.Item {...formItemLayout} label={t('姓名')}>
            {ldap.data.cn ? ldap.data.cn : (<div style={{color:'red', fontStyle:'italic'}}> [{t('点击EID的“查询”按钮进行验证')}] </div>)}
          </Form.Item>
          <Form.Item {...formItemLayout} label={t('角色')}>
            {getFieldDecorator('roles', {
              initialValue: this.state.data.roles ? this.state.data.roles.split(',') : [],
              rules: [
                {
                  required: true,
                  message: t('请输入角色'),
                },
              ],
            })(
              <Select
                mode="tags"
                style={{ width: '100%' }}
                maxLength={100}
                placeholder={t('请输入或选择角色')}
              >
                {
                  roles.map(d => (
                    <Option key={d}>{d}</Option>
                  ))
                }
              </Select>
            )}
          </Form.Item>
          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary"  htmlType="submit" loading={submitting}> {t('提交')} </Button>
            {
          this.state.editing && (this.props.match.params.id !== 'new') && (
            <Button
              onClick={() => this.setState({
                editing: false,
              })}
            >{t('取消')}
            </Button>
          )
        }
            {
        (!this.state.editing || this.props.match.params.id === 'new') && (
          <Button
            onClick={() => this.props.dispatch(routerRedux.push('/system/admins'))}
          >{t('返回')}
          </Button>
        )
      }
          </FormItem>
        </Form>
      </Card>
    );
  }

  render() {
    const { t } = this.props;
    const action = (
      <div>
        {
          !this.state.editing && (
            <Button
              type="primary"
              onClick={() => this.setState({
                editing: true,
                data: this.props.admin.data,
              })}
            >{t('修改')}
            </Button>
          )
        }
      </div >
    );
    return (
      <PageHeaderLayout
        title={t('管理员详情页面')}
        action={action}
      >{this.state.editing ? this.renderEdit() : this.renderView()}
      </PageHeaderLayout>

    );
  }
}

export default translate("translations")(Admin);
