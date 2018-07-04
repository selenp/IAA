import React, { PureComponent, Fragment } from 'react';
import { translate } from "react-i18next";
import { connect } from 'dva';
import { Link } from 'dva/router';
import {
  Button,
  Card,
  Col,
  Form,
  Icon,
  Input,
  Row,
  Table,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './List.less';

const FormItem = Form.Item;

@connect(({ dictionaries, loading }) => ({
  dictionaries,
  loading: loading.models.dictionaries,
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    group: '',
    page: 0,
    size: 10,
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dictionaries/fetchList',
    });
  }

  onChange = ({current, pageSize}) => {
    const { dispatch } = this.props;
    this.setState({
      page: current - 1,
      size: pageSize,
    }, () => dispatch({
      type: 'dictionaries/fetchList',
      payload: this.state,
    }));
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      this.setState({
        ...fieldsValue,
      }, () => dispatch({
        type: 'dictionaries/fetchList',
        payload: this.state,
      }));
    });
  };

  renderSimpleForm() {
    const { t } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label={t('分类')}>
              {getFieldDecorator('category', {
              rules: [
                {
                  message: t('请输入分类'),
                },
              ],
            })(<Input placeholder={t('请输入分类')} />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                <Icon type="search" />
                {t('查询')}
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { t } = this.props;
    const { dictionaries: { data: { list, pagination } }, loading } = this.props;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    const columns = [
      {
        title: t('分类'),
        width: 150,
        dataIndex: 'category',
      },
      {
        title: t('分类名称'),
        width: 240,
        dataIndex: 'categoryName',
      },
      {
        title: t('值'),
        dataIndex: 'data',
        render: (val, row) => {
          return (
            <pre>
              <Link to={`/system/dictionary/${row.id}`}>
                {val.indexOf('password') > -1 ? '******' : val}
              </Link>
            </pre>
          );
        },
      },
      {
        title: t('操作'),
        width: 120,
        render: (val, row) => !row.category.startsWith('system.') && (
          <Fragment>
            <a onClick={() => this.props.dispatch({
                type: 'dictionaries/delete',
                id: row.id,
                t,
            })}
            >
              {t('删除')}
              <Icon type="delete" />
            </a>
          </Fragment>
        ),
      },
    ];

    return (
      <PageHeaderLayout
        title={t('数据字典')}
        content={t('数据字典的管理')}
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
