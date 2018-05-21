import React, { Fragment } from 'react';
import { connect } from 'dva';
import {
  Card,
  Form,
} from 'antd';
import moment from 'moment';

import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import ConfirmForm from './ConfirmReturnForm';
import styles from './style.less';


const formItemLayout = {
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 12,
  },
};

@Form.create()
class Step2 extends React.PureComponent {
  componentDidMount() {
      this.props.dispatch({
        type: 'io/fetch',
        id: this.props.match.params.id,
      });
  }


  render() {
    const { form, data, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = e => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'io/submitDelivery',
            payload: {
              ...data,
              ...values,
              returnDate: moment().format('YYYY-MM-DD HH:mm'),
              progress: 'return',
            },
            next: '/delivery/return/result',
          });
        }
      });
    };
    return (
      <PageHeaderLayout
        title="设备归还"
        content="操作不熟悉的用户，请在IT人员的指导下完成。"
      >
        <Card bordered={false}>
          <Fragment>
            {
          data && (
          <ConfirmForm
            styles={styles}
            data={data}
            onValidateForm={onValidateForm}
            getFieldDecorator={getFieldDecorator}
            formItemLayout={formItemLayout}
            submitting={submitting}
          />
          )
        }
          </Fragment>
        </Card>
      </PageHeaderLayout>
    );
  }
}

export default connect(({ delivery, loading }) => ({
  submitting: loading.effects['delivery/fetch'],
  data: delivery.step,
}))(Step2);
