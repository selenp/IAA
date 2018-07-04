import React, { PureComponent } from 'react';
import { translate } from "react-i18next";
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col, List, Form, Input, Icon, Button, Card } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './List.less';
import AnnouncementItem from '../../components/AnnouncementItem.jsx';

const FormItem = Form.Item;

@connect(({ announcements, user, loading }) => ({
  currentUser: user.currentUser,
  announcements,
  loading: loading.models.announcements,
}))
@Form.create()
class TableList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      eid: props.currentUser.userid,
      page: 0,
      size: 10,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'announcements/fetchList',
      payload: this.state,
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'announcements/initData',
    });
  }

  fetchMore = () => {
    const { dispatch } = this.props;
    this.setState(
      {
        page: this.state.page + 1,
      },
      () =>
        dispatch({
          type: 'announcements/fetchList',
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

      if (!xlsx) {
        dispatch({
          type: 'announcements/initData',
        });
      }

      this.setState(
        {
          ...fieldsValue,
          xlsx,
        },
        () =>
          dispatch({
            type: xlsx ? 'announcements/xlsx' : 'announcements/fetchList',
            payload: this.state,
            t,
          })
      );
    });
  }

  changeProgress(item, progress) {
    const { t } = this.props;
    const { dispatch } = this.props;
    dispatch({
      type: 'announcement/submit',
      payload: {
        ...item,
        progress,
      },
      t,
    });

    item.progress = progress;
    this.forceUpdate();
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
                    message:t('请输入EID'),
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
              <Link to="/announcement/new">
                <Button style={{ marginLeft: 8 }}>
                  <Icon type="plus" />
                  {t('通知')}
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
      announcements: {
        data: { list, pagination },
      },
      loading,
    } = this.props;

    const loadMore =
      pagination.total > list.length ? (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Button onClick={this.fetchMore} style={{ paddingLeft: 48, paddingRight: 48 }}>
            {loading ? (
              <span>
                <Icon type="loading" /> {t('加载中...')}
              </span>
            ) : (
              t('加载更多')
            )}
          </Button>
        </div>
      ) : null;

    return (
      <PageHeaderLayout title={t('通知')} content={t('我发布的通知')}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <List
              size="large"
              loading={list.length === 0 ? loading : false}
              rowKey="id"
              itemLayout="vertical"
              loadMore={loadMore}
              dataSource={list}
              renderItem={item => <AnnouncementItem item={item} />}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}

export default translate("translations")(TableList);
