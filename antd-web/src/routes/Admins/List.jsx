import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import {
  Row,
  Col,
  Form,
  Input,
  Icon,
  Button,
  Avatar,
  Card,
  Table,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './List.less';

const FormItem = Form.Item;

@connect(({ admins, loading }) => ({
  admins,
  loading: loading.models.admins,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    userid: '',
    page: 0,
    size: 10,
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'admins/fetchList',
    });
  }

  onChange = ({current, pageSize}) => {
    const { dispatch } = this.props;
    this.setState({
      page: current - 1,
      size: pageSize,
    }, () => dispatch({
      type: 'admins/fetchList',
      payload: this.state,
    }));
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      this.setState({
        ...fieldsValue,
      }, () => dispatch({
        type: 'admins/fetchList',
        payload: this.state,
      }));
    });
  };

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="EID">
              {getFieldDecorator('userid', {
                rules: [
                  {
                    message: '请输入EID',
                  },
                ],
              })(<Input placeholder="请输入EID" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                <Icon type="search" />
        查询
              </Button>
              <Link to="/system/admin/new">
                <Button style={{ marginLeft: 8 }}>
                  <Icon type="plus" />
        新增
                </Button>
              </Link>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { admins: { data: { list, pagination } }, loading } = this.props;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    const columns = [
      {
        title: 'EID',
        dataIndex: 'userid',
        render: (val, row) => (
          <Link to={`/system/admin/${row.id}`}>
            {val}
          </Link>
        ),
      },
      {
        title: '头像',
        dataIndex: 'avatar',
        render(val) {
          return <Avatar size="large" className={styles.avatar} src={val} />;
        },
      },
      {
        title: '姓名',
        dataIndex: 'fullname',
      },
      {
        title: '角色',
        dataIndex: 'roles',
        render(val) {
          return val.split(',').map(v => (<div key={v}>{v}</div>));
        },
      },
    ];

    return (
      <PageHeaderLayout
        title="用户管理"
        content="系统用户的增删改查、权限管理。"
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
