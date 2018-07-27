import React, { Component, Fragment } from 'react';
import { Link } from 'dva/router';
import { translate } from "react-i18next";

import {
  Button,
  Row,
  Col,
} from 'antd';

class MainMenu extends Component {
  render() {
    const { t } = this.props;
    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12,
      style: { marginBottom: 24, paddingLeft: 12, paddingRight: 12 },
    };

    return (
      <Fragment>
        <Row style={{padding: 24}}>
          <Col {...topColResponsiveProps}>
            <Link to="/delivery/borrow">
              <Button
                type="primary"
                icon="download"
                style={{width: '100%', height: 182, fontSize: 24}}
              >{t('领取设备')}
              </Button>
            </Link>
          </Col>
          <Col {...topColResponsiveProps}>
            <Link to="/delivery/return-delivery">
              <Button
                type="success"
                icon="upload"
                style={{width: '100%', height: 182, fontSize: 24}}
              >{t('归还设备')}
              </Button>
            </Link>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default translate("translations")(MainMenu);
