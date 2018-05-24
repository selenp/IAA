import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Button,
  Card,
  Form,
  Input,
  Select,
} from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';

import styles from './Admin.less';

const FormItem = Form.Item;

const { Description } = DescriptionList;

@connect(({ admin, loading }) => ({
  admin,
  loading: loading.effects['admin/fetch'],
  submitting: loading.effects['admin/submit'],
}))
@Form.create()
export default class Admin extends PureComponent {
  constructor(props) {
    super(props);

    if (this.props.match.params._id === 'new') {
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
    if (this.props.match.params._id !== 'new') {
      this.props.dispatch({
        type: 'admin/fetch',
        id: this.props.match.params._id,
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
            avatar: this.state.data.avatar,
            _id: this.props.match.params._id === 'new' ? null : this.props.match.params._id,
          },
        });
      }
    });
  }

  renderView() {
    const { admin: { data } } = this.props;

    return data && (
      <Card bordered={false}>
        <DescriptionList size="large" style={{ marginBottom: 32 }}>
          <Description term="eid">{data.userid}</Description>
          <Description term="简述">{data.fullname}</Description>
        </DescriptionList>
      </Card>
    );
  }

  renderEdit() {
    const { submitting} = this.props;
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
            message: '请输入EID',
          }],
        })(
          <Input placeholder="请输入EID" />
        )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<span>密码</span>}
          >
            {getFieldDecorator('password', {
          initialValue: this.state.data.password,
          rules: [{
            required: true,
            message: '请输入密码',
          }],
            })(
              <Input placeholder="请输入密码" type="password" />
        )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<span>姓名</span>}
          >
            {getFieldDecorator('fullname', {
          initialValue: this.state.data.fullname,
          rules: [{
            required: true,
            message: '请输入姓名',
          }],
            })(
              <Input placeholder="请输入姓名" />
        )}
          </FormItem>
          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" loading={submitting}> 提交 </Button>
            {
          this.state.editing && (this.props.match.params._id !== 'new') && (
            <Button
              onClick={e => this.setState({
                editing: false,
              })}
            >取消
            </Button>
          )
        }
            {
        (!this.state.editing || this.props.match.params._id === 'new') && (
          <Button
            onClick={e => this.props.dispatch(routerRedux.push('/admins/list'))}
          >返回
          </Button>
        )
      }
          </FormItem>
        </Form>
      </Card>
    );
  }

  render() {
    const action = (
      <div>
        {
          !this.state.editing && (
            <Button
              type="primary"
              onClick={e => this.setState({
                editing: true,
                data: this.props.admin.data,
              })}
            >修改
            </Button>
          )
        }
      </div >
    );
    return (
      <PageHeaderLayout
        title="模块详细页面"
        action={action}
      >{this.state.editing ? this.renderEdit() : this.renderView()}
      </PageHeaderLayout>

    );
  }
}
