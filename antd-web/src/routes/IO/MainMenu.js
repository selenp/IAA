import React, { Component, Fragment } from 'react';
import { Link } from 'dva/router';
import {
  Button,
  Row,
  Col,
} from 'antd';

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234,
  });
}

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
            <Link to="/io/borrow">
              <Button
                type="primary"
                icon="download"
                style={{width: '100%', height: 182, fontSize: 24}}
              >领取设备
              </Button>
            </Link>
          </Col>
          <Col {...topColResponsiveProps}>
            <Link to="/io/return-equipment">
              <Button
                type="danger"
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
