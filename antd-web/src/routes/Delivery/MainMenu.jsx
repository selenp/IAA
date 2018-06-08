import React, { Component, Fragment } from 'react';
import { Link } from 'dva/router';
import {
  Button,
  Row,
  Col,
} from 'antd';

export default class MainMenu extends Component {
  render() {
    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12,
      style: { marginBottom: 24 },
    };

    return (
      <Fragment>
        <Row gutter={24} style={{padding: 24}}>
          <Col {...topColResponsiveProps}>
            <Link to="/delivery/borrow">
              <Button
                type="primary"
                icon="download"
                style={{width: '100%', height: 182, fontSize: 24}}
              >领取设备
              </Button>
            </Link>
          </Col>
          <Col {...topColResponsiveProps}>
            <Link to="/delivery/return-delivery">
              <Button
                type="success"
                icon="upload"
                style={{width: '100%', height: 182, fontSize: 24}}
              >归还设备
              </Button>
            </Link>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
