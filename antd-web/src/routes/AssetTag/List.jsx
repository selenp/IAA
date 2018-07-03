import React, { PureComponent } from 'react';
import { translate } from "react-i18next";
import { connect } from 'dva';
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
class TableList extends PureComponent {
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
    const { t } = this.props;
    const {
      assetTag: { history },
      loading,
    } = this.props;

    const columns = [
      {
        title:t('借用时间'),
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
        title:t('自EID'),
        sorter: true,
        dataIndex: 'fromEid',
      },
      {
        title:t('至EID'),
        sorter: true,
        dataIndex: 'toEid',
      },
    ];

    return (
      <PageHeaderLayout title={`${t('设备取还履历')}:${this.props.match.params.assettag}`} content="">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <Table
              loading={loading}
              dataSource={history}
              rowKey="id"
              columns={columns}
              onChange={this.handleStandardTableChange}
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
