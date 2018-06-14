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
          fullname: '',
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
  componentWillReceiveProps(nextProps) {
    if (this.props.ldap.data.uid !== nextProps.ldap.data.uid) {
      this.props.form.setFieldsValue({
        fullname: nextProps.ldap.data.cn,
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'admin/submit',
          payload: {
            ...values,
            roles: values.roles.join(','),
            avatar: avatars[Math.floor(Math.random()*avatars.length)],
            id: this.props.match.params.id === 'new' ? null : this.props.match.params.id,
          },
        });
      }
    });
  }

  handleSeachEid = (eid) => {
    this.props.dispatch({
      type: 'ldap/search',
      uid: eid,
    });
  }

  renderView() {
    const { t } = this.props;
    const { admin: { data } } = this.props;

    return data && (
      <Card bordered={false}>
        <DescriptionList size="large" style={{ marginBottom: 32 }}>
          <Description term={t("姓名")}>{data.fullname}</Description>
          <Description term={t("eid")}>{data.userid}</Description>
          <Description term={t("角色")}>{data.roles}</Description>
        </DescriptionList>
      </Card>
    );
  }

  renderEdit() {
    const { t } = this.props;
    const { submitting, roles} = this.props;
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
            placeholder={t("请输入EID")}
            onSearch={value => this.handleSeachEid(value)}
          />
        )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<span>{t("密码")}</span>}
          >
            {getFieldDecorator('password', {
          initialValue: this.state.data.password,
          rules: [{
            required: true,
            message:t('请输入密码'),
          }],
            })(
              <Input placeholder={t("请输入密码")} type="password" />
        )}
          </FormItem>
          <Form.Item {...formItemLayout} label={t("角色")}>
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
                placeholder={t("请输入或选择角色")}
              >
                {
                  roles.map(d => (
                    <Option key={d}>{d}</Option>
                  ))
                }
              </Select>
            )}
          </Form.Item>
          <FormItem
            {...formItemLayout}
            label={<span>{t("姓名")}</span>}
          >
            {getFieldDecorator('fullname', {
          initialValue: this.state.data.fullname,
          rules: [{
            required: true,
            message: t('请输入姓名'),
          }],
            })(
              <Input placeholder={t("请输入姓名")} />
        )}
          </FormItem>
          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary"  htmlType="submit" loading={submitting}> {t("提交")} </Button>
            {
          this.state.editing && (this.props.match.params.id !== 'new') && (
            <Button
              onClick={() => this.setState({
                editing: false,
              })}
            >{t("取消")}
            </Button>
          )
        }
            {
        (!this.state.editing || this.props.match.params.id === 'new') && (
          <Button
            onClick={() => this.props.dispatch(routerRedux.push('/system/admins'))}
          >{t("返回")}
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
            >{t("修改")}
            </Button>
          )
        }
      </div >
    );
    return (
      <PageHeaderLayout
        title={t("模块详情页面")}
        action={action}
      >{this.state.editing ? this.renderEdit() : this.renderView()}
      </PageHeaderLayout>

    );
  }
}

export default translate("translations")(Admin);
