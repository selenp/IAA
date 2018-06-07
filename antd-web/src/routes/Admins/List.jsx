import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Avatar, Button, Card, Col, Form, Icon, Input, Row, Select, Table } from 'antd';
import { groupBy, map } from 'lodash';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './List.less';

const { Option } = Select;
const FormItem = Form.Item;
const getQuery = (location, param) => {
  let v = '';
  if (location.search && location.search.startsWith('?')) {
    v = location.search.split(/[\?#&]/).reduce((s, c) => {
      const t = c.split('=');
      s[t[0]] = t[1];
      return s;
    }, {})[param];
    v = v ? decodeURIComponent(v) : '';
  }
  return v;
};

@connect(({ admins, loading, dictionary }) => ({
  admins,
  loading: loading.models.admins,
  roles: map(groupBy(dictionary.data, 'category').role, v => v.data),
}))
@Form.create()
export default class TableList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      size: 10,
    };
  }

  componentDidMount() {
    const { dispatch, location } = this.props;
    dispatch({
      type: 'admins/fetchList',
      payload: {
        ...this.state,
        role: getQuery(location, 'role'),
      },
    });
  }

  onChange = ({ current, pageSize }) => {
    const { dispatch } = this.props;
    this.setState(
      {
        ...this.state,
        page: current - 1,
        size: pageSize,
      },
      () =>
        dispatch({
          type: 'admins/fetchList',
          payload: this.state,
        })
    );
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      this.setState(
        {
          ...fieldsValue,
        },
        () =>
          dispatch({
            type: 'admins/fetchList',
            payload: this.state,
          })
      );
    });
  };

  renderSimpleForm() {
    const { roles, location } = this.props;
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
            <FormItem label="角色">
              {getFieldDecorator('role', {
                initialValue: getQuery(location, 'role'),
                rules: [
                  {
                    message: '请选择角色',
                  },
                ],
              })(
                <Select style={{ width: '100%' }} mode="combobox" placeholder="请选择角色">
                  {roles.map(d => <Option key={d}>{d}</Option>)}
                </Select>
              )}
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
    const {
      admins: {
        data: { list, pagination },
      },
      loading,
    } = this.props;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    const columns = [
      {
        title: 'EID',
        dataIndex: 'userid',
        render: (val, row) => <Link to={`/system/admin/${row.id}`}>{val}</Link>,
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
          return val.split(',').map(v => (
            <div key={v}>
              <Link to={`/system/admins/?role=${v}`}>{v}</Link>
            </div>
          ));
        },
      },
    ];

    return (
      <PageHeaderLayout title="用户管理" content="系统用户的增删改查、权限管理。">
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
