import React, { PureComponent } from 'react';
import { translate } from "react-i18next";
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Button, Card, Form, Input, Select } from 'antd';
import moment from 'moment';
import { groupBy, map } from 'lodash';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';

const { Option } = Select;
const FormItem = Form.Item;
const { TextArea } = Input;

const { Description } = DescriptionList;

@connect(({ announcement, user, loading, allDictionaries }) => ({
  currentUser: user.currentUser,
  announcement,
  loading: loading.effects['announcement/fetch'],
  submitting: loading.effects['announcement/submit'],
  roles: map(groupBy(allDictionaries.data, 'category').role, v => v.data),
}))
@Form.create()
class Announcement extends PureComponent {
  constructor(props) {
    super(props);

    if (this.props.match.params.id === 'new') {
      this.state = {
        editing: true,
        data: {},
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
        type: 'announcement/fetch',
        id: this.props.match.params.id,
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { t } = this.props;
    const { form, dispatch, currentUser } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'announcement/submit',
          payload: {
            ...values,
            eid: currentUser.userid,
            progress: 'reserved',
            id: this.props.match.params.id === 'new' ? null : this.props.match.params.id,
          },
          t,
          redirect: `/system/announcements`,
        });
      }
    });
  };

  renderView() {
    const { t } = this.props;
    const {
      announcement: { data },
    } = this.props;

    return (
      data && (
        <Card bordered={false}>
          <DescriptionList size="large" style={{ marginBottom: 32 }}>
            <Description term={t('日期')}>
              {moment(data.createdDate).format('YYYY-MM-DD HH:mm')}
            </Description>
            <Description term={t('发送给')}>{data.assignToRole}</Description>
          </DescriptionList>
          {data.content}
        </Card>
      )
    );
  }

  renderEdit() {
    const { t } = this.props;
    const { submitting, roles } = this.props;
    const { getFieldDecorator } = this.props.form;

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    return (
      <Card bordered={false}>
        <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
          <FormItem label={<span>{t('内容')}</span>}>
            {getFieldDecorator('content', {
              initialValue: this.state.data.content,
              rules: [
                {
                  required: true,
                  message: t('请输入内容'),
                },
              ],
            })(<TextArea rows={20} placeholder={t('请输入内容')} />)}
          </FormItem>
          <Form.Item label={t('指派给角色')}>
            {getFieldDecorator('assignToRole', {
              initialValue: this.state.data.assignToRole,
              rules: [
                {
                  required: true,
                  message:t('请选择角色'),
                },
              ],
            })(
              <Select style={{ width: '100%' }} placeholder={t('请选择角色')}>
                {roles.map(d => <Option key={d}>{d}</Option>)}
              </Select>
            )}
          </Form.Item>
          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" loading={submitting}>
              {' '}
              {t('提交')}{' '}
            </Button>
            {this.state.editing &&
              this.props.match.params.id !== 'new' && (
                <Button
                  onClick={() =>
                    this.setState({
                      editing: false,
                    })
                  }
                >
                  {t('提交')}
                </Button>
              )}
            {(!this.state.editing || this.props.match.params.id === 'new') && (
              <Button onClick={() => this.props.dispatch(routerRedux.push('/system/announcements'))}>
                {t('返回')}
              </Button>
            )}
          </FormItem>
        </Form>
      </Card>
    );
  }

  render() {
    const { t } = this.props;
    const action = (
      <div>
        {!this.state.editing && (
          <Button
            type="primary"
            onClick={() =>
              this.setState({
                editing: true,
                data: this.props.announcement.data,
              })
            }
          >
            {t('修改')}
          </Button>
        )}
      </div>
    );
    return (
      <PageHeaderLayout title={t('详细页面')} action={action}>
        {this.state.editing ? this.renderEdit() : this.renderView()}
      </PageHeaderLayout>
    );
  }
}

export default translate("translations")(Announcement);
