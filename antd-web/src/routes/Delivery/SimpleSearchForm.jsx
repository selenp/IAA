import React from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Icon,
  Button,
} from 'antd';
import { Link } from 'dva/router';

const FormItem = Form.Item;

const SimpleSearchForm = ({
  styles,
  getFieldDecorator,
  handleSearch,
}) => (
  <Form onSubmit={handleSearch} layout="inline">
    <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
      <Col md={8} sm={24}>
        <FormItem label="EID">
          {getFieldDecorator('eid', {
      rules: [
        {
          required: true,
          message: '请输入EID',
        },
      ],
    })(<Input placeholder="请输入EID" />)}
        </FormItem>
      </Col>
      <Col md={8} sm={24}>
        <span className={styles.submitButtons}>
          <Button type="primary" htmlType="submit">
            <Icon type="search" />
    查询
          </Button>
          <Link to="/delivery/return">
            <Button style={{ marginLeft: 8 }}>
              <Icon type="plus" />
    设备归还
            </Button>
          </Link>
        </span>
      </Col>
    </Row>
  </Form>
);

export default SimpleSearchForm;
