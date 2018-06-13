import React, { Fragment } from 'react';
import { connect } from 'dva';
import { translate } from "react-i18next";
import {
  Card,
  Form,
} from 'antd';
import moment from 'moment';
import { groupBy, map } from 'lodash';

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
        type: 'delivery/fetch',
        id: this.props.match.params.id,
      });
  }


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
            },
            next: '/delivery/return/result',
          });
        }
      });
    };
    return (
      <PageHeaderLayout
        title={t("归还设备")}
        content={t("操作不熟悉的用户，请在IT人员的指导下完成")}
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
            getFieldValue={getFieldValue}
            formItemLayout={formItemLayout}
            submitting={submitting}
            laptopModels={laptopModels}
            monitorSizes={monitorSizes}
          />
          )
        }
          </Fragment>
        </Card>
      </PageHeaderLayout>
    );
  }
}

export default connect(({ delivery, loading, allDictionaries }) => ({
  submitting: loading.effects['delivery/fetch'],
  data: delivery.step,
  laptopModels: map(groupBy(allDictionaries.data, 'category').laptopModel, v =>v.data),
  monitorSizes: map(groupBy(allDictionaries.data, 'category').monitorSize, v =>v.data),
}))(translate("translations")(Step2));
