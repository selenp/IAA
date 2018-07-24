import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { translate } from "react-i18next";
import { Route, Redirect, Switch } from 'dva/router';
import { Card, Steps } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import NotFound from '../../Exception/404';
import { getRoutes } from '../../../utils/utils';
import styles from '../style.less';

const { Step } = Steps;

const getQuery = (location, param) => {
  let v = '';
  if (location.search && location.search.startsWith('?')) {
    v = location.search.split(/[\?#&]/).reduce((s, c) => {
      const t = c.split('=');
      s[t[0]] = t[1];
      return s;
    }, {})[param];
    v = v ? decodeURIComponent(v) : '';
  }
  return v;
};
@connect()
class StepForm extends PureComponent {
  componentDidMount() {
    const { dispatch, location } = this.props;

    // search string
    const taskId = getQuery(location, 'task');
    if (taskId) {
      dispatch({
        type: 'task/fetch',
        id: taskId,
      });
    }

    dispatch({
      type: 'transfer/initData',
      payload: {
        taskId,
      },
    });
  }
  getCurrentStep() {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split('/');
    switch (pathList[pathList.length - 1]) {
      case 'info':
        return 0;
      case 'confirm':
        return 1;
      case 'result':
        return 2;
      default:
        return 0;
    }
  }
  render() {
    const { t } = this.props;
    const { match, routerData } = this.props;
    return (
      <PageHeaderLayout
        title={t('设备移交')}
        content={t('IT人员之间的批量设备移交')}
      >
        <Card bordered={false}>
          <Fragment>
            <Steps current={this.getCurrentStep()} className={styles.steps}>
              <Step title={t('确定 领取人')} />
              <Step title={t('填写设备信息')} />
              <Step title={t('双方确认并签字')} />
            </Steps>
            <Switch>
              {getRoutes(match.path, routerData).map(item => (
                <Route
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                />
              ))}
              <Redirect exact from="/transfer/borrow" to="/transfer/borrow/info" />
              <Route render={NotFound} />
            </Switch>
          </Fragment>
        </Card>
      </PageHeaderLayout>
    );
  }
}

export default translate("translations")(StepForm);
