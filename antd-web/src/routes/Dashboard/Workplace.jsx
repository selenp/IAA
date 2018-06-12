import React, { PureComponent } from 'react';
import { translate } from "react-i18next";
import { connect } from 'dva';
import { Avatar, Card, Col, List, Row } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './Workplace.less';
import AnnouncementItem from '../../components/AnnouncementItem.jsx';
import TaskItem from '../../components/TaskItem.jsx';

@connect(({ user, tasks, announcements, loading }) => ({
  currentUser: user.currentUser,
  tasks,
  tasksLoading: loading.effects['tasks/fetchList'],
  announcements,
  announcementsLoading: loading.effects['announcements/fetchList'],
}))
class Workplace extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'tasks/fetchList',
      payload: {
        progresses: ['reserved', 'processing'].join(','),
      },
    });
    dispatch({
      type: 'announcements/fetchList',
      payload: {
        progresses: ['reserved', 'processing'].join(','),
      },
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'tasks/initData',
    });
    dispatch({
      type: 'announcements/initData',
    });
  }

  changeProgress(item, progress) {
    const { dispatch } = this.props;
    dispatch({
      type: 'task/submit',
      payload: {
        ...item,
        progress,
      },
    });

    item.progress = progress;
    this.forceUpdate();
  }

  render() {
    const { t } = this.props;
    const { currentUser, tasksLoading, tasks, announcementsLoading, announcements } = this.props;

    const pageHeaderContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar size="large" src={currentUser.avatar} />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>{`Hello，${currentUser.fullname}！`}</div>
          <div />
        </div>
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
      </div>
    );

    return (
      <PageHeaderLayout content={pageHeaderContent} extraContent={extraContent}>
        <Row gutter={24}>
          <Col xl={12} lg={12} md={24} sm={24} xs={24}>
            <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.activeCard}
              title={t("通知")}
              loading={announcementsLoading}
            >
              <List
                loading={announcementsLoading}
                size="large"
                dataSource={announcements.data.list}
                renderItem={item => <AnnouncementItem item={item} />}
              />
            </Card>
          </Col>
          <Col xl={12} lg={12} md={24} sm={24} xs={24}>
            <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.activeCard}
              title={t("Related tasks")}
              loading={tasksLoading}
            >
              <List
                loading={tasksLoading}
                size="large"
                dataSource={tasks.data.list}
                renderItem={item => (
                  <TaskItem
                    item={item}
                    changeProgress={(task, progress) => this.changeProgress(task, progress)}
                  />
                )}
              />
            </Card>
          </Col>
        </Row>
      </PageHeaderLayout>
    );
  }
}

export default translate("translations")(Workplace);
