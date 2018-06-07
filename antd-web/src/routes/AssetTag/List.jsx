import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import moment from 'moment';
import { Form, Icon, Card, Table } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { FILE_URL } from '../../utils/utils';

import styles from './List.less';

@connect(({ assetTag, loading }) => ({
  assetTag,
  loading: loading.models.assetTag,
}))
@Form.create()
export default class TableList extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'assetTag/fetchHistory',
      assettag: this.props.match.params.assettag,
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const {
      assetTag: { history },
    } = this.props;
    if (sorter.field) {
      history.sort((a, b) => {
        if (sorter.order === 'ascend') {
          const v = a[sorter.field];
          return v ? v.localeCompare(b[sorter.field]) : -1;
        } else {
          const v = b[sorter.field];
          return v ? v.localeCompare(a[sorter.field]) : -1;
        }
      });
    }
  };

  render() {
    const {
      assetTag: { history },
      loading,
    } = this.props;

    const columns = [
      {
        title: '时间',
        sorter: true,
        dataIndex: 'borrowDate',
        render: (val, row) =>
          row.signatureImage ? (
            <a href={`${FILE_URL}/${row.signatureImage}`} target="_blank">
              {val && moment(val).format('YYYY-MM-DD HH:mm')}
              <Icon type="export" />
            </a>
          ) : (
            <div>{val && moment(val).format('YYYY-MM-DD HH:mm')}</div>
          ),
      },
      {
        title: '自EID',
        sorter: true,
        dataIndex: 'fromEid',
      },
      {
        title: '至EID',
        sorter: true,
        dataIndex: 'toEid',
      },
    ];

    return (
      <PageHeaderLayout title={`设备取还履历:${this.props.match.params.assettag}`} content="">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <Table
              loading={loading}
              dataSource={history}
              rowKey="id"
              columns={columns}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
