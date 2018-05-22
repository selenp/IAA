import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import {
  Button,
  Card,
  Col,
  Form,
  Icon,
  Input,
  Row,
  Table,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './List.less';

const FormItem = Form.Item;

@connect(({ dictionaries, loading }) => ({
  dictionaries,
  loading: loading.models.dictionaries,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    group: '',
    page: 0,
    size: 10,
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dictionaries/fetch',
    });
  }

  handleXlsx = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'dictionaries/xlsx',
      payload: {},
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      this.setState({
        ...fieldsValue,
      }, () => dispatch({
        type: 'dictionaries/fetch',
        payload: this.state,
      }));
    });
  };

  onChange = ({current, pageSize}) => {
    const { dispatch } = this.props;
    this.setState({
      page: current - 1,
      size: pageSize,
    }, () => dispatch({
      type: 'dictionaries/fetch',
      payload: this.state,
    }));
  };

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="类别">
              {getFieldDecorator('category', {
              rules: [
                {
                  required: true,
                  message: '请输入类别',
                },
              ],
            })(<Input placeholder="请输入类别" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                <Icon type="search" />
   查询
              </Button>
              <Button type="dashed" style={{ marginLeft: 8 }} onClick={this.handleXlsx}>
                <Icon type="download" />
    xlsx下载
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { dictionaries: { data: { list, pagination } }, loading } = this.props;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    const columns = [
      {
        title: '类别',
        dataIndex: 'category',
      },
      {
        title: '值',
        dataIndex: 'data',
        render: (val, row) => {
          return (
            <Link to={`/dictionaries/${row.id}`}>
              {val}
            </Link>
          );
        },
      },
      {
        title: '操作',
        render: (val, row) => (
          <Fragment>
            <a onClick={() => this.props.dispatch({
              type: 'dictionaries/delete',
              id: row.id,
            })}
            >
            删除
              <Icon type="delete" />
            </a>
          </Fragment>
        ),
      },
    ];

    return (
      <PageHeaderLayout
        title="数据字典"
        content="数据字典的管理。"
      >
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              loading={loading}
              dataSource={list}
              pagination={paginationProps}
              rowKey="id"
              onChange={this.onChange}
              columns={columns}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
