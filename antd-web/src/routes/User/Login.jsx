import React, { Component } from 'react';
import { translate } from "react-i18next";
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Checkbox, Alert, Icon } from 'antd';
import QRCode from 'qrcode.react';

import Login from 'components/Login';
import styles from './Login.less';

const { Tab, UserName, Password, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
  state = {
    type: 'account',
  };

  onTabChange = type => {
    this.setState({ type });
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      this.props.dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  };

  changeAutoLogin = e => {
    this.setState({
    });
  };

  renderMessage = content => {
    return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
  };

  render() {
    const { t } = this.props;
    const { login, submitting } = this.props;
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <Login defaultActiveKey={type} onTabChange={this.onTabChange} onSubmit={this.handleSubmit}>
          <Tab key="account" tab={t("账户密码登录")}>
            {login.status === 'error' &&
              login.type === 'account' &&
              !login.submitting &&
              this.renderMessage(t('账户或密码错误'))}
            <UserName name="userid" placeholder={t("您的EID")} />
            <Password name="password" placeholder={t("密码")} />
          </Tab>
          <Tab key="scan" tab={t("扫码登录")}>
            <QRCode
              value="https://test.tttalk.org/mp/socket/a-fake-socket"
              size={360}
            />
          </Tab>
          <Submit loading={submitting}>登录</Submit>
        </Login>
        <div className={styles.desc}>
          <p>
            {t("如果忘记密码，请联系上级管理员进行密码重置。")}
          </p>
        </div>
      </div>
    );
  }
}

export default translate("translations")(LoginPage);
