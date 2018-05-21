import React, { Fragment } from 'react';
import { connect } from 'dva';
import {
  Form,
} from 'antd';
import { routerRedux } from 'dva/router';

import ConfirmForm from './ConfirmForm';
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
  render() {
    const { form, data, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onPrev = () => {
      dispatch(routerRedux.push('/delivery/step-form'));
    };
    const onValidateForm = e => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'io/submitDelivery',
            payload: {
              ...data,
              ...values,
              progress: 'borrow',
            },
            next: '/delivery/borrow/result',
          });
        }
      });
    };
    return (
      <Fragment>
        <ConfirmForm
          styles={styles}
          data={data}
          onValidateForm={onValidateForm}
          getFieldDecorator={getFieldDecorator}
          formItemLayout={formItemLayout}
          onPrev={onPrev}
          submitting={submitting}
        />
      </Fragment>
    );
  }
}

export default connect(({ delivery, loading }) => ({
  submitting: loading.effects['delivery/submitDelivery'],
  data: delivery.step,
}))(Step2);
