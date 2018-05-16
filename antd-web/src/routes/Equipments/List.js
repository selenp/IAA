import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import moment from 'moment';
import {
  Badge,
  Icon,
  Card,
  Form,
  Table,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import SimpleSearchForm from '../IO/SimpleSearchForm';

import styles from './List.less';

const progressMap = {
  borrow:'processing',
  return: 'success',
};
const progress = {
  borrow:'已领取',
  return: '已归还',
};

@connect(({ equipments, loading }) => ({
  equipments,
  loading: loading.models.equipments,
}))
@Form.create()
export default class TableList extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'equipments/fetch',
    });
  }

  handleXlsx = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'equipments/xlsx',
      payload: {},
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      dispatch({
        type: 'equipments/fetch',
        payload: values,
      });
    });
  };

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <SimpleSearchForm
        styles={styles}
        getFieldDecorator={getFieldDecorator}
        handleSearch={this.handleSearch}
        handleXlsx={this.handleXlsx}
      />
    );
  }

  render() {
    const { equipments: { data: { list, pagination } }, loading } = this.props;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    const columns = [
      {
        title: '借出日期',
        dataIndex: 'created_date',
        render: (val, row) => (
          <a href={`http://39.106.104.75:3022/images/${row.signatureImage}`} target="_blank">
            {moment(val).format('YYYY-MM-DD HH:mm')}
            <Icon type="export" />
          </a>
        ),
      },
      {
        title: 'EID/姓名',
        dataIndex: 'eid',
        render(val, row) {
          return <span>{row.eid} / {row.fullname}</span>;
        },
      },
      {
        title: '项目/部门',
        dataIndex: 'id',
        render(val, row) {
          return <span>{row.projectName} / {row.businessUnit}</span>;
        },
      },
      {
        title: '状态',
        dataIndex: 'progress',
        render(val) {
          return <Badge status={progressMap[val]} text={progress[val]} />;
        },
      },
      {
        title: '归还时间',
        dataIndex: 'returnDate',
        render: (val, row) => {
          return row.progress === 'borrow' ? (
            <Link to={`/io/return/confirm/${row.id}`}>
              待归还
              <Icon type="desktop" />
            </Link>
          ) : (
            <a href={`http://39.106.104.75:3022/images/${row.returnSignatureImage}`} target="_blank">
              {moment(val).format('YYYY-MM-DD HH:mm')}
              <Icon type="export" />
            </a>
          );
        },
      },
    ];

    return (
      <PageHeaderLayout
        title="设备取还"
        content="设备取还的查询。"
      >
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              loading={loading}
              dataSource={list}
              pagination={paginationProps}
              rowKey="id"
              columns={columns}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
