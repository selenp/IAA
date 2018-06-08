import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Link, Redirect, Switch, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import { translate } from "react-i18next";

import GlobalFooter from '../components/GlobalFooter';
import styles from './UserLayout.less';
import logo from '../assets/logo.png';
import { getRoutes } from '../utils/utils';

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2018
  </Fragment>
);

@connect(({ dictionary, loading }) => ({
  dictionary,
  loading: loading.models.dictionary,
}))
class UserLayout extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'dictionary/allDictionaries',
    });
  }

  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'IAA';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - IAA`;
    }
    return title;
  }
  render() {
    const { t, i18n } = this.props;
    const changeLanguage = lng => {
      i18n.changeLanguage(lng);
    };

    const { routerData, match } = this.props;
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <span className={styles.title}>{t("IAA")}</span>
                  <img alt="logo" className={styles.logo} src={logo} />
                </Link>
              </div>
              <div className={styles.desc}>{t("智能资产管理助手 - 设备领取、归还 - 无纸化办公实验版")}</div>
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
              <Link to="/">管理员登录</Link>
              <a href="http://file.tttalk.org/tmp/equipment/README.html" target="_blank">使用说明</a>
            </div>
            <div className={styles.links}>
              <button onClick={() => changeLanguage("en")}>{t("en")}</button>
              <button onClick={() => changeLanguage("zh")}>{t("zh")}</button>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default translate("translations")(UserLayout);
