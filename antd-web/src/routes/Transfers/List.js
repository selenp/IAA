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
    eid: '',
    page: 0,
    size: 10,
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'transfers/fetch',
    });
  }

  onChange = ({current, pageSize}) => {
    const { dispatch } = this.props;
    this.setState({
      page: current - 1,
      size: pageSize,
    }, () => dispatch({
      type: 'transfers/fetch',
      payload: this.state,
    }));
  };

  handleXlsx = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'transfers/xlsx',
      payload: {},
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      this.setState({
        ...fieldsValue,
      }, () => dispatch({
        type: 'transfers/fetch',
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
            <FormItem label="eid">
              {getFieldDecorator('eid', {
              rules: [
                {
                  required: true,
                  message: '请输入eid',
                },
              ],
            })(<Input placeholder="请输入eid" />)}
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
    xlsx下载
              </Button>
              <Link to="/transfer/borrow">
                <Button style={{ marginLeft: 8 }}>
                  <Icon type="plus" />
    设备取还
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
              {val}
              <Icon type="export" />
            </a>
) : <div>{val}</div>
        ),
      },
      {
        title: '自eid',
        dataIndex: 'ownerEid',
      },
      {
        title: '至eid',
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
