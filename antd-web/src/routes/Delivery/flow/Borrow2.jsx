import React, { Fragment } from 'react';
import { translate } from "react-i18next";
import { connect } from 'dva';
import { Form } from 'antd';
import moment from 'moment';
import { routerRedux } from 'dva/router';
import { groupBy, map } from 'lodash';

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
    const { form, data, dispatch, submitting, laptopModels, monitorSizes, peripheralModels } = this.props;
    const { getFieldDecorator, getFieldValue, validateFields } = form;
    const onPrev = () => {
      dispatch(routerRedux.push('/delivery/borrow/info'));
    };
    const onValidateForm = e => {
      const { t } = this.props;

      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'delivery/submitDelivery',
            payload: {
              ...data,
              ...values,
              borrowDate: moment().format('YYYY-MM-DD HH:mm'),
              progress: 'borrow',
              machineType: values.machineType || data.machineType,
              monitorSize: values.monitorSize ? values.monitorSize.join(',') : null,
            },
            next: '/delivery/borrow/result',
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
          peripheralModels={peripheralModels}
        />
      </Fragment>
    );
  }
}

export default connect(({ delivery, loading, allDictionaries }) => ({
  submitting: loading.effects['delivery/submitDelivery'],
  data: delivery.step,
  laptopModels: map(groupBy(allDictionaries.data, 'category').laptopModel, v => v.data),
  monitorSizes: map(groupBy(allDictionaries.data, 'category').monitorSize, v => v.data),
  peripheralModels:map(groupBy(allDictionaries.data, 'category').peripheralModel, v =>v.data),
}))(translate("translations")(Step2));
