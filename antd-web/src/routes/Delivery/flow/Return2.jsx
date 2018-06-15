import React, { Fragment } from 'react';
import { connect } from 'dva';
import { translate } from "react-i18next";
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
    const { t } = this.props;
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
              machineType: values.machineType || data.machineType,
              returnMonitorSize: values.returnMonitorSize ? values.returnMonitorSize.join(',') : null,
            },
            next: '/delivery/return/result',
            t,
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

export default connect(({ delivery, loading, allDictionaries }) => ({
  submitting: loading.effects['delivery/submitDelivery'],
  data: delivery.step,
  laptopModels: map(groupBy(allDictionaries.data, 'category').laptopModel, v =>v.data),
  monitorSizes: map(groupBy(allDictionaries.data, 'category').monitorSize, v =>v.data),
}))(translate("translations")(Step2));
