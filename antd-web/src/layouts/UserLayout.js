import React, { Fragment } from 'react';
import { Link, Redirect, Switch, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import GlobalFooter from '../components/GlobalFooter';
import styles from './UserLayout.less';
import logo from '../assets/logo.svg';
import { getRoutes } from '../utils/utils';

const links = [
  {
    key: 'io',
    title: '设备取还',
    href: '/delivery/main',
  },
  {
    key: 'login',
    title: '管理员登录',
    href: '/user/login',
  },
];

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2018
  </Fragment>
);

class UserLayout extends React.PureComponent {
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = '设备取还';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - 设备取还`;
    }
    return title;
  }
  render() {
    const { routerData, match } = this.props;
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={logo} />
                  <span className={styles.title}>设备取还</span>
                </Link>
              </div>
              <div className={styles.desc}>^^^^ - 设备领取、归还 - 无纸化办公实验版</div>
            </div>
            <Switch>
              {getRoutes(match.path, routerData).map(item => (
                <Route
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                />
              ))}
              <Redirect exact from="/user" to="/user/login" />
            </Switch>
          </div>
        <div className={styles.globalFooter}>
        <div className={styles.links}>
            <Link to="/delivery/main">设备取还</Link>
            <Link to="/user/login">管理员登录</Link>
          </div>
        </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
