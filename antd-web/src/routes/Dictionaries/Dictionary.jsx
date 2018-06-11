import React, { PureComponent } from 'react';
import { translate } from "react-i18next";
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Button,
  Card,
  Form,
  Input,
} from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';

const FormItem = Form.Item;
const { TextArea } = Input;

const { Description } = DescriptionList;


@connect(({ dictionary, loading }) => ({
  dictionary,
  loading: loading.effects['dictionary/fetch'],
  submitting: loading.effects['dictionary/submit'],
}))
@Form.create()
class Dictionary extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      data: null,
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'dictionary/fetch',
      id: this.props.match.params.id,
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'dictionary/submit',
          payload: {
            ...values,
            id: this.props.match.params.id,
          },
        });
      }
    });
  }


  renderView() {
    const { dictionary: { data } } = this.props;

    return data && (
      <Card bordered={false}>
        <DescriptionList size="large" style={{ marginBottom: 32 }}>
          <Description term="类别">{data.category}</Description>
          <Description term="类别名称">{data.categoryName}</Description>
          <Description term="值">{data.data}</Description>
        </DescriptionList>
      </Card>
    );
  }

  renderEdit() {
    const { submitting } = this.props;
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
            label={<span>类别</span>}
          >
            {getFieldDecorator('category', {
          initialValue: this.state.data.category,
          rules: [{
            required: true,
            message: '请输入类别',
          }],
            })(
              <Input placeholder="请输入类别" />
        )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<span>类别</span>}
          >
            {getFieldDecorator('categoryName', {
          initialValue: this.state.data.categoryName,
          rules: [{
            required: true,
            message: '请输入类别名称',
          }],
            })(
              <Input placeholder="请输入类别名称" />
        )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<span>值</span>}
          >
            {getFieldDecorator('data', {
          initialValue: this.state.data.data,
          rules: [{
            required: true,
            message: '请输入值',
          }],
        })(
          <TextArea rows={20} placeholder="请输入值" />
        )}
          </FormItem>
          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary"  htmlType="submit" loading={submitting}> 提交 </Button>
            {
          this.state.editing && (
            <Button
              onClick={e => this.setState({
                editing: false,
              })}
            >取消
            </Button>
          )
        }
            {
        (!this.state.editing) && (
          <Button
            onClick={e => this.props.dispatch(routerRedux.push('/system/dictionaries'))}
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
    const { t } = this.props;
    const action = (
      <div>
        {
          !this.state.editing && (
            <Button
              type="primary"
              onClick={e => this.setState({
                editing: true,
                data: this.props.dictionary.data,
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

export default translate("translations")(Dictionary);
