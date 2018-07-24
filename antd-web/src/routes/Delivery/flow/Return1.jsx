import React, { Fragment } from 'react';
import { connect } from 'dva';
import { translate } from "react-i18next";
import {
  Form,
  Divider,
} from 'antd';
import { routerRedux } from 'dva/router';
import { groupBy, map } from 'lodash';

import styles from './style.less';
import InfoForm from './InfoForm';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@Form.create()
class Step1 extends React.PureComponent {
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'ldap/initData',
    });
  }
  handleSeachEid = (eid) => {
    if (eid) {
      this.props.dispatch({
        type: 'ldap/search',
        uid: eid,
      });
    }
  }
  handleInitLdap = () => {
    this.props.dispatch({
      type: 'ldap/initData',
    });
  }

  render() {
    const { t } = this.props;
    const {
      form,
      data,
      ldap,
      dispatch,
      businessUnits,
      projectNames,
      locationBuildings,
    } = this.props;
    const { getFieldDecorator, validateFields } = form;

    const onValidateForm = () => {
      if (!ldap.data.cn) {
        return;
      }
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'delivery/saveData',
            payload: values,
          });
          dispatch(routerRedux.push('/delivery/return/confirm'));
        }
      });
    };
    // TODO
    return (
      <Fragment>
        <InfoForm
          ldap={ldap}
          styles={styles}
          data={data}
          onValidateForm={onValidateForm}
          getFieldDecorator={getFieldDecorator}
          formItemLayout={formItemLayout}
          businessUnits={businessUnits}
          projectNames={projectNames}
          locationBuildings={locationBuildings}
          handleSeachEid={this.handleSeachEid}
          handleInitLdap={this.handleInitLdap}
        />
        <Divider style={{ margin: '40px 0 24px' }} />
        <div className={styles.desc}>
          <h3>{t('说明')}</h3>
        </div>
      </Fragment>
    );
  }
}

export default connect(({ delivery, allDictionaries, ldap }) => ({
  data: delivery.step,
  ldap,
  businessUnits: map(groupBy(allDictionaries.data, 'category').businessUnit, v =>v.data),
  projectNames: map(groupBy(allDictionaries.data, 'category').projectName, v =>v.data),
  locationBuildings: map(groupBy(allDictionaries.data, 'category').locationBuilding, v =>v.data),
}))(translate("translations")(Step1));

