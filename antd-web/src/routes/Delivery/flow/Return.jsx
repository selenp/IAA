import React, { PureComponent, Fragment } from 'react';
import { translate } from "react-i18next";
import { Route, Redirect, Switch } from 'dva/router';
import { Card, Steps } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import NotFound from '../../Exception/404';
import { getRoutes } from '../../../utils/utils';
import styles from '../style.less';

const { Step } = Steps;

class StepForm extends PureComponent {
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
        title={t("归还设备")}
        content={t("操作不熟悉的用户，请在IT人员的指导下完成")}
      >
        <Card bordered={false}>
          <Fragment>
            <Steps current={this.getCurrentStep()} className={styles.steps}>
              <Step title={t("归还人 填写信息")} />
              <Step title={t("IT部门 填写设备信息")} />
              <Step title={t("双方确认并签字")} />
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
              <Redirect exact from="/delivery/return" to="/delivery/return/info" />
              <Route render={NotFound} />
            </Switch>
          </Fragment>
        </Card>
      </PageHeaderLayout>
    );
  }
}

export default translate("translations")(StepForm);
