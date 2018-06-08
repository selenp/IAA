import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import { I18nextProvider } from "react-i18next";

import i18n from "./i18n";
import { getRouterData } from './common/router';
import Authorized from './utils/Authorized';
import styles from './index.less';

const { ConnectedRouter } = routerRedux;
const { AuthorizedRoute } = Authorized;
dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />;
});

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const UserLayout = routerData['/user'].component;
  const BasicLayout = routerData['/'].component;
  return (
    <I18nextProvider i18n={i18n}>
      <LocaleProvider locale={zhCN}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/user" component={UserLayout} />
            <Route path="/delivery" component={UserLayout} />
            <AuthorizedRoute
              path="/"
              render={props => <BasicLayout {...props} />}
              authority={(currentAuthority) => {
                const roles = currentAuthority.split(',');
                return roles.indexOf('asset manager') > -1 || roles.indexOf('super admin') > -1 || roles.indexOf('it staff') > -1;
              }}
              redirectPath="/user/login"
              />
          </Switch>
        </ConnectedRouter>
      </LocaleProvider>
    </I18nextProvider>
  );
}

export default RouterConfig;
