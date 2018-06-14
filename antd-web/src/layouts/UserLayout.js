import React, { Fragment } from 'react';
import { connect } from 'dva';
import {
  Link,
  Redirect,
  Route,
  Switch,
 } from 'dva/router';
import DocumentTitle from 'react-document-title';
import {
  Icon,
  Radio,
 } from 'antd';
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
      type: 'allDictionaries/allDictionaries',
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
              <Link to="/delivery/main">{t("设备取还")}</Link>
              <Link to="/">{t("管理员登录")}</Link>
              <a href="http://file.tttalk.org/tmp/equipment/README.html" target="_blank">
                {t("使用说明")}
              </a>
            </div>
            <Radio.Group defaultValue={i18n.language} onChange={(e) => changeLanguage(e.target.value)}>
              <Radio.Button key="en" value="en">{t("en")}</Radio.Button>
              <Radio.Button key="zh" value="zh">{t("zh")}</Radio.Button>
            </Radio.Group>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default translate("translations")(UserLayout);
