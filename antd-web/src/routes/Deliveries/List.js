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

@connect(({ deliveries, loading }) => ({
  deliveries,
  loading: loading.models.deliveries,
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
      type: 'deliveries/fetch',
    });
  }

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

  handleXlsx = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'deliveries/xlsx',
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
        type: 'deliveries/fetch',
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
              <Link to="/delivery/borrow">
                <Button style={{ marginLeft: 8 }}>
                  <Icon type="plus" />
    领取设备
                </Button>
              </Link>
              <Link to="/delivery/borrow">
                <Button style={{ marginLeft: 8 }}>
                  <Icon type="plus" />
    归还设备
                </Button>
              </Link>
            </span>
          </Col>
        </Row>
      </Form>
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
          row.signatureImage ? (
            <a href={`${FILE_URL}/images/${row.signatureImage}`} target="_blank">
              {val}
              <Icon type="export" />
            </a>
) : <div>{val}</div>
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
        title: 'eid/姓名',
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
            row.returnSignatureImage ? (
              <a href={`${FILE_URL}!/images/${row.returnSignatureImage}`} target="_blank">
                {val}
                <Icon type="export" />
              </a>
            ) : <div>{val}</div>
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
              onChange={this.onChange}
              columns={columns}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
