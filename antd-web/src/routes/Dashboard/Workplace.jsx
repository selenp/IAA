import React, { PureComponent } from 'react';
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
export default class Workplace extends PureComponent {
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
        <div className={styles.statItem}>
          <p>今天</p>
          <p>6</p>
        </div>
        <div className={styles.statItem}>
          <p>明天</p>
          <p>8</p>
        </div>
        <div className={styles.statItem}>
          <p>后天</p>
          <p>2</p>
        </div>
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
              title="通知"
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
              title="相关任务"
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
