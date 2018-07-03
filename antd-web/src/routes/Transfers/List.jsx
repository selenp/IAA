import React, { PureComponent } from 'react';
import { translate } from "react-i18next";
import { connect } from 'dva';
import { Link } from 'dva/router';
import moment from 'moment';
import { Row, Col, Form, Input, Icon, Button, Badge, Card, Table } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { FILE_URL } from '../../utils/utils';

import styles from './List.less';

const FormItem = Form.Item;

const progressMap = {
  borrow: 'processing',
  return: 'success',
};
const progressTitle = {
  borrow: '已领取',
  return: '已归还',
};

@connect(({ transfers, loading }) => ({
  transfers,
  loading: loading.models.transfers,
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    page: 0,
    size: 10,
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'transfers/fetchList',
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
          type: 'transfers/fetchList',
          payload: this.state,
        })
    );
  };

  handleXlsx = e => {
    this.handleSearch(e, { xlsx: true });
  };

  handleSearch(e, { xlsx }) {
    e.preventDefault();

    const { t } = this.props;
    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      this.setState(
        {
          ...fieldsValue,
          xlsx,
        },
        () =>
          dispatch({
            type: xlsx ? 'transfers/xlsx' : 'transfers/fetchList',
            payload: this.state,
            t,
          })
      );
    });
  }

  renderSimpleForm() {
    const { t } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={e => this.handleSearch(e, { xlsx: false })} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="EID">
              {getFieldDecorator('eid', {
                rules: [
                  {
                    message: t('请输入EID'),
                  },
                ],
              })(<Input placeholder={t('请输入EID')} />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                <Icon type="search" />
                {t('查询')}
              </Button>
              <Button type="dashed" style={{ marginLeft: 8 }} onClick={this.handleXlsx}>
                <Icon type="download" />
                {t('下载')}
              </Button>
              <Link to="/transfer/borrow">
                <Button style={{ marginLeft: 8 }}>
                  <Icon type="plus" />
                  {t('设备取还')}
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
      transfers: {
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
        title: t('时间'),
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
        dataIndex: 'assetTags',
        render(val) {
          return val.split(',').map(v => (
            <div key={v}>
              <Link to={`/assettag/${encodeURIComponent(v)}`}>{v}</Link>
            </div>
          ));
        },
      },
      {
        title: t('自EID'),
        dataIndex: 'fromEid',
      },
      {
        title: t('至EID'),
        dataIndex: 'toEid',
      },
      {
        title: t('状态'),
        dataIndex: 'status',
        render(val) {
          return <Badge status={progressMap[val]} text={t(progressTitle[val])} />;
        },
      },
    ];

    return (
      <PageHeaderLayout title={t('设备取还')} content={t('设备取还履历')}>
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
