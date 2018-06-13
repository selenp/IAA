import React, { PureComponent } from 'react';
import { translate } from "react-i18next";
import { connect } from 'dva';
import { Link } from 'dva/router';
import moment from 'moment';
import {
  Badge,
  Card,
  Form,
  Icon,
  Table,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import SimpleSearchForm from './SimpleSearchForm';
import { FILE_URL } from '../../utils/utils';

import styles from './ReturnList.less';

const progressMap = {
  borrow: 'processing',
  return: 'success',
};
const progress = {
  borrow: '已领取',
  return: '已归还',
};

@connect(({ deliveries, loading }) => ({
  deliveries,
  loading: loading.models.deliveries,
}))
@Form.create()
class ResturnList extends PureComponent {
  state = {
    eid: '',
    page: 0,
    size: 10,
  };
  componentDidMount() {
    const { dispatch } = this.props;
    // init data
    dispatch({
      type: 'deliveries/initData',
      payload: [],
    });
  }

  onChange = ({ current, pageSize }) => {
    const { dispatch } = this.props;
    this.setState(
      {
        page: current - 1,
        size: pageSize,
      },
      () =>
        dispatch({
          type: 'deliveries/fetchList',
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
            type: 'deliveries/fetchList',
            payload: this.state,
          })
      );
    });
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
    const { t } = this.props;
    const {
      deliveries: {
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
        title: t('借出时间'),
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
        title: t('设备编号'),
        dataIndex: 'assetTag',
        render: v => <Link to={`/assettag/${v}`}>{v}</Link>,
      },
      {
        title: t('状态'),
        dataIndex: 'progress',
        render(val) {
          return <Badge status={progressMap[val]} text={t(progress[val])} />;
        },
      },
      {
        title: t('EID/姓名'),
        dataIndex: 'eid',
        render(val, row) {
          return (
            <span>
              {row.eid} / {row.fullname}
            </span>
          );
        },
      },
      {
        title: t('项目/部门'),
        dataIndex: 'id',
        render(val, row) {
          return (
            <span>
              {row.projectName} / {row.businessUnit}
            </span>
          );
        },
      },
      {
        title: t('归还时间'),
        dataIndex: 'returnDate',
        render: (val, row) => {
          return row.progress === 'borrow' ? (
            <Link to={`/delivery/return/confirmData/${row.id}`}>
              {t("待归还")}
              <Icon type="desktop" />
            </Link>
          ) : row.returnSignatureImage ? (
            <a href={`${FILE_URL}/${row.returnSignatureImage}`} target="_blank">
              {val && moment(val).format('YYYY-MM-DD HH:mm')}
              <Icon type="export" />
            </a>
          ) : (
            <div>{val && moment(val).format('YYYY-MM-DD HH:mm')}</div>
          );
        },
      },
    ];

    return (
      <PageHeaderLayout title={t("归还设备")} content={t("操作不熟悉的用户，请在IT人员的指导下完成")}>
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

export default translate("translations")(ResturnList);
