import React, { Fragment } from 'react';
import { connect } from 'dva';
import {
  Form,
} from 'antd';
import moment from 'moment';
import { routerRedux } from 'dva/router';
import { groupBy, map } from 'lodash';

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
  render() {
    const {
      form,
      data,
      dispatch,
      submitting,
      laptopModels,
      monitorSizes,
    } = this.props;
    const { getFieldDecorator, getFieldValue, validateFields } = form;
    const onPrev = () => {
      dispatch(routerRedux.push('/delivery/return/info'));
    };
    const onValidateForm = e => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'delivery/submitDelivery',
            payload: {
              ...data,
              ...values,
              returnDate: moment().format('YYYY-MM-DD HH:mm'),
              progress: 'return',
              monitorSize: values.machineType === 'desktop' ? values.returnMonitorSize.join(',') : null,
            },
            next: '/delivery/return/result',
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
          getFieldValue={getFieldValue}
          formItemLayout={formItemLayout}
          onPrev={onPrev}
          submitting={submitting}
          laptopModels={laptopModels}
          monitorSizes={monitorSizes}
        />
      </Fragment>
    );
  }
}

export default connect(({ delivery, loading, dictionary }) => ({
  submitting: loading.effects['delivery/submitDelivery'],
  data: delivery.step,
  laptopModels: map(groupBy(dictionary.data, 'category').laptopModel, v =>v.data),
  monitorSizes: map(groupBy(dictionary.data, 'category').monitorSize, v =>v.data),
}))(Step2);
