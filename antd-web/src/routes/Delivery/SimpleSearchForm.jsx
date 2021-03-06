import React from 'react';
import { translate } from "react-i18next";
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
  t,
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
          message: t('请输入EID'),
        },
      ],
          })(<Input placeholder={t('请输入EID')} />)}
        </FormItem>
      </Col>
      <Col md={8} sm={24}>
        <span className={styles.submitButtons}>
          <Button type="primary" htmlType="submit">
            <Icon type="search" />
            {t('查询')}
          </Button>
          <Link to="/delivery/return">
            <Button style={{ marginLeft: 8 }}>
              <Icon type="plus" />
              {t('归还设备')}
            </Button>
          </Link>
        </span>
      </Col>
    </Row>
  </Form>
);

export default translate("translations")(SimpleSearchForm);
