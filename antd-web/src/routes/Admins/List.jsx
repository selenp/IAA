import React, { PureComponent, Fragment } from 'react';
import { translate } from "react-i18next";
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

@connect(({ admins, user, loading, allDictionaries }) => ({
  currentUser: user.currentUser,
  admins,
  loading: loading.models.admins,
  roles: map(groupBy(allDictionaries.data, 'category').role, v => v.data),
}))
@Form.create()
class TableList extends PureComponent {
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
    const { t } = this.props;
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
                    message: t('请输入EID'),
                  },
                ],
              })(<Input placeholder={t('请输入EID')} />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label={t('角色')}>
              {getFieldDecorator('role', {
                initialValue: getQuery(location, 'role'),
                rules: [
                  {
                    message:t('请选择角色'),
                  },
                ],
              })(
                <Select style={{ width: '100%' }} mode="combobox" placeholder={t('请选择角色')}>
                  {roles.map(d => <Option key={d}>{d}</Option>)}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                <Icon type="search" />
                {t('查询')}
              </Button>
              <Link to="/system/admin/new">
                <Button style={{ marginLeft: 8 }}>
                  <Icon type="plus" />
                  {t('新增')}
                </Button>
              </Link>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { t } = this.props;
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
        title: t('eid'),
        dataIndex: 'userid',
        render: (val, row) => (row.userid === this.props.currentUser.userid) ?
          val : <Link to={`/system/admin/${row.id}`}>{val}</Link>,
      },
      {
        title:t('头像'),
        dataIndex: 'avatar',
        render(val) {
          return <Avatar size="large" className={styles.avatar} src={val} />;
        },
      },
      {
        title:t('角色'),
        dataIndex: 'roles',
        render(val) {
          return val.split(',').map(v => (
            <div key={v}>
              <Link to={`/system/admins/?role=${v}`}>{v}</Link>
            </div>
          ));
        },
      },
      {
        title: t('操作'),
        width: 120,
        render: (val, row) => (
          <Fragment>
            <a onClick={() => this.props.dispatch({
                type: 'admins/delete',
                id: row.id,
                t,
            })}
            >
              {t('删除')}
              <Icon type="delete" />
            </a>
          </Fragment>
        ),
      },
    ];

    return (
      <PageHeaderLayout title={t('用户管理')} content={t('系统用户的增删改查、权限管理')}>
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
              locale={{
                emptyText: t('暂无数据'),
              }}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}

export default translate("translations")(TableList);
