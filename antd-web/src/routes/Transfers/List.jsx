import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import moment from 'moment';
import {
  Row,
  Col,
  Form,
  Input,
  Icon,
  Button,
  Badge,
  Card,
  Table,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { FILE_URL } from '../../utils/utils';

import styles from './List.less';

const FormItem = Form.Item;

const progressMap = {
  borrow:'processing',
  return: 'success',
};
const progress = {
  borrow:'已领取',
  return: '已归还',
};

@connect(({ transfers, loading }) => ({
  transfers,
  loading: loading.models.transfers,
}))
@Form.create()
export default class TableList extends PureComponent {
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

  onChange = ({current, pageSize}) => {
    const { dispatch } = this.props;
    this.setState({
      page: current - 1,
      size: pageSize,
    }, () => dispatch({
      type: 'transfers/fetchList',
      payload: this.state,
    }));
  };

  handleXlsx = (e) => {
    this.handleSearch(e, {xlsx: true});
  };

  handleSearch (e, { xlsx }) {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      this.setState({
        ...fieldsValue,
        xlsx,
      }, () => dispatch({
        type: xlsx ? 'transfers/xlsx' : 'transfers/fetchList',
        payload: this.state,
      }));
    });
  };

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={e => this.handleSearch(e, {xlsx: false})} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="EID">
              {getFieldDecorator('eid', {
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
              <Button type="dashed" style={{ marginLeft: 8 }} onClick={this.handleXlsx}>
                <Icon type="download" />
    下载
              </Button>
              <Link to="/transfer/borrow">
                <Button style={{ marginLeft: 8 }}>
                  <Icon type="plus" />
    IT设备取还
                </Button>
              </Link>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { transfers: { data: { list, pagination } }, loading } = this.props;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    const columns = [
      {
        title: '时间',
        dataIndex: 'effectiveDate',
        render: (val, row) => (
          row.signatureImage ? (
            <a href={`${FILE_URL}/images/${row.signatureImage}`} target="_blank">
              {val && moment(val).format('YYYY-MM-DD HH:mm')}
              <Icon type="export" />
            </a>
          ) : <div>{val && moment(val).format('YYYY-MM-DD HH:mm')}</div>
        ),
      },
      {
        title: '自EID',
        dataIndex: 'ownerEid',
      },
      {
        title: '至EID',
        dataIndex: 'eid',
      },
      {
        title: '状态',
        dataIndex: 'status',
        render(val) {
          return <Badge status={progressMap[val]} text={progress[val]} />;
        },
      },
      {
        title: '设备编号',
        dataIndex: 'assetTags',
        render: (val) => val.split(',').map(v => (
          <div key={v}>{v}</div>
          )),
      },
    ];

    return (
      <PageHeaderLayout
        title="设备取还"
        content="IT设备取还流程。"
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
