import React, { PureComponent } from 'react';
import { translate } from "react-i18next";
import { Button, Spin, Card } from 'antd';
import { connect } from 'dva';
import styles from './style.less';

@connect(state => ({
  isloading: state.error.isloading,
}))
class TriggerException extends PureComponent {
  state = {
    isloading: false,
  };
  triggerError = code => {
    this.setState({
      isloading: true,
    });
    this.props.dispatch({
      type: 'error/query',
      payload: {
        code,
      },
    });
  };
  render() {
    const { t } = this.props;
    return (
      <Card>
        <Spin spinning={this.state.isloading} wrapperClassName={styles.trigger}>
          <Button type="danger" onClick={() => this.triggerError(401)}>
            {t("触发401")}
          </Button>
          <Button type="danger" onClick={() => this.triggerError(403)}>
            {t("触发403")}
          </Button>
          <Button type="danger" onClick={() => this.triggerError(500)}>
            {t("触发500")}
          </Button>
          <Button type="danger" onClick={() => this.triggerError(404)}>
            {t("触发404")}
          </Button>
        </Spin>
      </Card>
    );
  }
}

export default translate("translations")(TriggerException);
