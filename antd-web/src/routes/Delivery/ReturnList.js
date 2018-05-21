import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import {
  Badge,
  Icon,
  Card,
  Form,
  Table,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import SimpleSearchForm from './SimpleSearchForm';
import { FILE_URL } from '../../utils/utils';

import styles from './ReturnList.less';

const progressMap = {
  borrow:'processing',
  return: 'success',
};
const progress = {
  borrow:'已领取',
  return: '已归还',
};

@connect(({ deliveries, loading }) => ({
  deliveries,
  loading: loading.models.deliveries,
}))
@Form.create()
export default class ResturnList extends PureComponent {
  state = {
    eid: '',
    page: 0,
    size: 10,
  };
  componentDidMount() {
    const { dispatch } = this.props;
    // init data
    dispatch({
      type: 'deliveries/init',
      payload: [],
    });
  }

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      this.setState({
        ...fieldsValue,
      }, () => dispatch({
        type: 'deliveries/fetch',
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
      type: 'deliveries/fetch',
      payload: this.state,
    }));
  };

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <SimpleSearchForm
        styles={styles}
        getFieldDecorator={getFieldDecorator}
        handleSearch={this.handleSearch}
      />
    );
  }

  render() {
    const { deliveries: { data: { list, pagination } }, loading } = this.props;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    const columns = [
      {
        title: '借出时间',
        dataIndex: 'effectiveDate',
        render: (val, row) => (
          <a href={`${FILE_URL}/images/${row.signatureImage}`} target="_blank">
            {val}
            <Icon type="export" />
          </a>
        ),
      },
      {
        title: '设备编号',
        dataIndex: 'assetTag',
      },
      {
        title: '状态',
        dataIndex: 'progress',
        render(val) {
          return <Badge status={progressMap[val]} text={progress[val]} />;
        },
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
        title: '归还时间',
        dataIndex: 'returnDate',
        render: (val, row) => {
          return row.progress === 'borrow' ? (
            <Link to={`/delivery/return/confirm/${row.id}`}>
              待归还
              <Icon type="desktop" />
            </Link>
          ) : (
            <a href={`${FILE_URL}/images/${row.returnSignatureImage}`} target="_blank">
              {val}
              <Icon type="export" />
            </a>
          );
        },
      },
    ];

    return (
      <PageHeaderLayout
        title="设备归还"
        content="操作不熟悉的用户，请在IT人员的指导下完成。"
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
