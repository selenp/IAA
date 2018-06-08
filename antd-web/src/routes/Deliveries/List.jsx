import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import moment from 'moment';
import {
  Badge,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Icon,
  Input,
  Row,
  Select,
  Table,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { FILE_URL } from '../../utils/utils';

import styles from './List.less';

const { Option } = Select;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

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
export default class TableList extends PureComponent {
  state = {
    expandForm: false,
    page: 0,
    size: 10,
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'deliveries/fetchList',
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

  handleXlsx = e => {
    this.handleSearch(e, { xlsx: true });
  };

  handleSearch = (e, { xlsx }) => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const dateRange = fieldsValue.dateRange
        ? fieldsValue.dateRange.map(v => v.format('YYYY-MM-DD')).join(',')
        : '';
      this.setState(
        {
          ...fieldsValue,
          dateRange,
          xlsx,
        },
        () =>
          dispatch({
            type: xlsx ? 'deliveries/xlsx' : 'deliveries/fetchList',
            payload: this.state,
          })
      );
    });
  }

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  };

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={e => this.handleSearch(e, { xlsx: false })} layout="inline">
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
            <FormItem label="设备编号">
              {getFieldDecorator('assetTag', {
                rules: [
                  {
                    message: '请输入设备编号',
                  },
                ],
              })(<Input placeholder="请输入设备编号" />)}
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
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type={this.state.expandForm ? 'down' : 'up'} />
              </a>
            </span>
          </Col>
        </Row>
        {this.state.expandForm && (
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <FormItem label="日期">
                {getFieldDecorator('dateRange')(
                  <RangePicker placeholder={['开始日期', '结束日期']} style={{ width: '100%' }} />
                )}
              </FormItem>
            </Col>
            <Col md={6} sm={24}>
              <FormItem label="状态">
                {getFieldDecorator('progress')(
                  <Select placeholder="请选择" style={{ width: '100%' }}>
                    <Option value="borrow">已领取</Option>
                    <Option value="return">已归还</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
        )}
        <span className={styles.submitButtons}>
          <Link to="/delivery/borrow">
            <Button style={{ marginLeft: 8 }}>
              <Icon type="download" />
              领取设备
            </Button>
          </Link>
          <Link to="/delivery/return">
            <Button style={{ marginLeft: 8 }}>
              <Icon type="upload" />
              归还设备
            </Button>
          </Link>
        </span>
      </Form>
    );
  }

  render() {
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
        title: '借出时间',
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
        title: '设备编号',
        dataIndex: 'assetTag',
        render: v => <Link to={`/assettag/${v}`}>{v}</Link>,
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
          return (
            <span>
              {row.eid} / {row.fullname}
            </span>
          );
        },
      },
      {
        title: '项目/部门',
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
        title: '归还时间',
        dataIndex: 'returnDate',
        render: (val, row) => {
          return row.progress === 'borrow' ? (
            <Link to={`/delivery/return/confirmData/${row.id}`}>
              待归还
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
      <PageHeaderLayout title="设备取还" content="设备取还的查询。">
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
