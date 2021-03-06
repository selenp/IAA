import React, { PureComponent } from 'react';
import { translate } from "react-i18next";
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Button, Card, DatePicker, Form, Input, Select } from 'antd';
import moment from 'moment';
import { groupBy, map } from 'lodash';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';

const { Option } = Select;
const FormItem = Form.Item;
const { TextArea } = Input;

const { Description } = DescriptionList;

@connect(({ task, user, loading, allDictionaries }) => ({
  currentUser: user.currentUser,
  task,
  loading: loading.effects['task/fetch'],
  submitting: loading.effects['task/submit'],
  roles: map(groupBy(allDictionaries.data, 'category').role, v => v.data),
  taskCategories: map(groupBy(allDictionaries.data, 'category').task_category, v => v.data),
}))
@Form.create()
class Task extends PureComponent {
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
        type: 'task/fetch',
        id: this.props.match.params.id,
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch, currentUser, t } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'task/submit',
          payload: {
            ...values,
            eid: currentUser.userid,
            progress: 'reserved',
            id: this.props.match.params.id === 'new' ? null : this.props.match.params.id,
          },
          t,
          redirect: `/tasks`,
        });
      }
    });
  };

  renderView() {
    const { t } = this.props;
    const {
      task: { data },
    } = this.props;

    return (
      data && (
        <Card bordered={false}>
          <DescriptionList size="large" style={{ marginBottom: 32 }}>
            <Description term={t('主题')}>{data.category}</Description>
            <Description term={t('状态')}>{data.progress}</Description>
            <Description term={t('期望日期')}>
              {moment(data.dueDate).format('YYYY-MM-DD')}
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
    const { submitting, roles, taskCategories } = this.props;
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
          <FormItem
            label={<span>{t('期望日期')}</span>}
            help={t('默认请于期望日期的上午9点钟前处理设备移交')}
          >
            {getFieldDecorator('dueDate', {
              initialValue: moment(this.state.data.dueDate),
              rules: [
                {
                  required: true,
                  message: t('请输入期望日期'),
                },
              ],
            })(<DatePicker format="YYYY-MM-DD" placeholder={t('请输入期望日期')} />)}
          </FormItem>
          <FormItem label={<span>{t('主题')}</span>}>
            {getFieldDecorator('category', {
              initialValue: this.state.data.category,
              rules: [
                {
                  required: true,
                  message: t('请选择或输入主题'),
                },
              ],
            })(
              <Select mode="combobox" style={{ width: '100%' }} maxLength={100} placeholder={t('请选择或输入主题')}>
                {taskCategories.map(d => <Option key={d}>{d}</Option>)}
              </Select>
            )}
          </FormItem>
          <FormItem label={<span>{t('内容')}</span>}>
            {getFieldDecorator('content', {
              initialValue: this.state.data.content,
              rules: [
                {
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
                  message: t('请选择角色'),
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
              {t('提交')}
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
                  {t('取消')}
                </Button>
              )}
            {(!this.state.editing || this.props.match.params.id === 'new') && (
              <Button onClick={() => this.props.dispatch(routerRedux.push('/tasks'))}>{t('返回')}</Button>
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
                data: this.props.task.data,
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

export default translate("translations")(Task);
