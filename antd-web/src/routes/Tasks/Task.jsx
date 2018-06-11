import React, { PureComponent } from 'react';
import { translate } from "react-i18next";
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Button, Card, DatePicker, Form, Input, Select } from 'antd';
import moment from 'moment';
import { groupBy, map } from 'lodash';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';

import styles from './Task.less';

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
    const { form, dispatch, currentUser } = this.props;
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
          redirect: `/tasks`,
        });
      }
    });
  };

  renderView() {
    const {
      task: { data },
    } = this.props;

    return (
      data && (
        <Card bordered={false}>
          <DescriptionList size="large" style={{ marginBottom: 32 }}>
            <Description term="主题">{data.category}</Description>
            <Description term="状态">{data.progress}</Description>
            <Description term="截止日期">
              {moment(data.dueDate).format('YYYY-MM-DD HH:mm')}
            </Description>
            <Description term="发送给">{data.assignToRole}</Description>
          </DescriptionList>
          {data.content}
        </Card>
      )
    );
  }

  renderEdit() {
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
          <FormItem label={<span>截止日期</span>}>
            {getFieldDecorator('dueDate', {
              initialValue: moment(this.state.data.dueDate),
              rules: [
                {
                  required: true,
                  message: '请输入截止日期',
                },
              ],
            })(<DatePicker showTime format="YYYY-MM-DD HH:mm" placeholder="请输入截止日期" />)}
          </FormItem>
          <FormItem label={<span>主题</span>}>
            {getFieldDecorator('category', {
              initialValue: this.state.data.category,
              rules: [
                {
                  required: true,
                  message: '请输入或选择主题',
                },
              ],
            })(
              <Select mode="combobox" style={{ width: '100%' }} placeholder="请输入或选择主题">
                {taskCategories.map(d => <Option key={d}>{d}</Option>)}
              </Select>
            )}
          </FormItem>
          <FormItem label={<span>内容</span>}>
            {getFieldDecorator('content', {
              initialValue: this.state.data.content,
              rules: [
                {
                  required: true,
                  message: '请输入内容',
                },
              ],
            })(<TextArea rows={20} placeholder="请输入内容" />)}
          </FormItem>
          <Form.Item label="指派给角色">
            {getFieldDecorator('assignToRole', {
              initialValue: this.state.data.assignToRole,
              rules: [
                {
                  required: true,
                  message: '请选择角色',
                },
              ],
            })(
              <Select style={{ width: '100%' }} placeholder="请选择角色">
                {roles.map(d => <Option key={d}>{d}</Option>)}
              </Select>
            )}
          </Form.Item>
          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" loading={submitting}>
              提交
            </Button>
            {this.state.editing &&
              this.props.match.params.id !== 'new' && (
                <Button
                  onClick={e =>
                    this.setState({
                      editing: false,
                    })
                  }
                >
                  取消
                </Button>
              )}
            {(!this.state.editing || this.props.match.params.id === 'new') && (
              <Button onClick={e => this.props.dispatch(routerRedux.push('/tasks'))}>返回</Button>
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
            onClick={e =>
              this.setState({
                editing: true,
                data: this.props.task.data,
              })
            }
          >
            修改
          </Button>
        )}
      </div>
    );
    return (
      <PageHeaderLayout title="详细页面" action={action}>
        {this.state.editing ? this.renderEdit() : this.renderView()}
      </PageHeaderLayout>
    );
  }
}

export default translate("translations")(Task);
