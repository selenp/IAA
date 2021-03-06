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
        type: 'dictionary/fetch',
        id: this.props.match.params.id,
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { t } = this.props;
    const { form, dispatch, match } = this.props;

    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'dictionary/submit',
          payload: {
            ...values,
            id: match.params.id === 'new' ? null : match.params.id,
          },
          t,
        });
      }
    });
  }


  renderView() {
    const { t } = this.props;
    const { dictionary: { data } } = this.props;

    return data && data.category && (
      <Card bordered={false}>
        <DescriptionList size="large" style={{ marginBottom: 32 }}>
          <Description term={t('分类')}>{data.category}</Description>
          <Description term={t('分类名称')}>{data.categoryName}</Description>
          <Description term={t('值')}>{(data.category.indexOf('password') > -1) ? '******' : data.data}</Description>
        </DescriptionList>
      </Card>
    );
  }

  renderEdit() {
    const { t } = this.props;
    const { submitting } = this.props;
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 16 },
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
            label={<span>{t('分类')}</span>}
          >
            {getFieldDecorator('category', {
          initialValue: this.state.data.category,
          rules: [{
            required: true,
            message: t('请输入分类'),
          }],
            })(
              <Input maxLength={100} placeholder={t('请输入分类')} />
        )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<span>{t('分类名称')}</span>}
          >
            {getFieldDecorator('categoryName', {
          initialValue: this.state.data.categoryName,
          rules: [{
            required: true,
            message: t('请输入分类名称'),
          }],
            })(
              <Input maxLength={100} placeholder={t('请输入分类名称')} />
        )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<span>{t('Data')}</span>}
          >
            {getFieldDecorator('data', {
          initialValue: this.state.data.data,
          rules: [{
            required: true,
            message: t('请输入值'),
          }],
        })(
              this.state.data.category.indexOf('password') > -1 ? (
                <Input type="password" maxLength={100} placeholder={t('请输入值')} />
                ) : (
                  <TextArea rows={10} maxLength={100} placeholder={t('请输入值')} />
                )
        )}
          </FormItem>
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
            onClick={() => this.props.dispatch(routerRedux.push('/system/dictionaries'))}
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
                data: this.props.dictionary.data,
              })}
            >{t('修改')}
            </Button>
          )
        }
      </div >
    );
    return (
      <PageHeaderLayout
        title={t('数据字典详情页面')}
        action={action}
      >{this.state.editing ? this.renderEdit() : this.renderView()}
      </PageHeaderLayout>

    );
  }
}

export default translate("translations")(Dictionary);
