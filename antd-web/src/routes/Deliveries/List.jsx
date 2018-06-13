import React, { PureComponent } from 'react';
import { translate } from "react-i18next";
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
class TableList extends PureComponent {
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
                    message:t('请输入EID'),
                  },
                ],
              })(<Input placeholder={t("请输入EID")} />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label={t("设备编号")}>
              {getFieldDecorator('assetTag', {
                rules: [
                  {
                    message: t('请输入设备编号'),
                  },
                ],
              })(<Input placeholder={t("请输入设备编号")} />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                <Icon type="search" />
                {t("查询")}
              </Button>
              <Button type="dashed" style={{ marginLeft: 8 }} onClick={this.handleXlsx}>
                <Icon type="download" />
                {t("下载")}
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                {t("展开")}<Icon type={this.state.expandForm ? 'down' : 'up'} />
              </a>
            </span>
          </Col>
        </Row>
        {this.state.expandForm && (
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <FormItem label={t("日期")}>
                {getFieldDecorator('dateRange')(
                  <RangePicker placeholder={[t('开始日期'), t('结束日期')]} style={{ width: '100%' }} />
                )}
              </FormItem>
            </Col>
            <Col md={6} sm={24}>
              <FormItem label={t("状态")}>
                {getFieldDecorator('progress')(
                  <Select placeholder={t("请选择")} style={{ width: '100%' }}>
                    <Option value="borrow">{t("已领取")}</Option>
                    <Option value="return">{t("已归还")}</Option>
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
              {t("领取设备")}
            </Button>
          </Link>
          <Link to="/delivery/return">
            <Button style={{ marginLeft: 8 }}>
              <Icon type="upload" />
              {t("归还设备")}
            </Button>
          </Link>
        </span>
      </Form>
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
        title:t('借用时间'),
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
        title:t('设备编号'),
        dataIndex: 'assetTag',
        render: v => <Link to={`/assettag/${v}`}>{v}</Link>,
      },
      {
        title:t('状态'),
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
      <PageHeaderLayout title={t("设备取还")} content={t("设备取还的查询")}>
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

export default translate("translations")(TableList);
