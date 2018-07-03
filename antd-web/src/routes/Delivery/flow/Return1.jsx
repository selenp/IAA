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
  componentDidMount() {
    this.props.dispatch({
      type: 'delivery/initData',
    });
  }
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
      ldap,
      dispatch,
      businessUnits,
      projectNames,
      locationBuildings,
      locationFloors,
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
          onValidateForm={onValidateForm}
          getFieldDecorator={getFieldDecorator}
          formItemLayout={formItemLayout}
          businessUnits={businessUnits}
          projectNames={projectNames}
          locationBuildings={locationBuildings}
          locationFloors={locationFloors}
          handleSeachEid={this.handleSeachEid}
          handleInitLdap={this.handleInitLdap}
        />
        <Divider style={{ margin: '40px 0 24px' }} />
        <div className={styles.desc}>
          <h3>{t('说明')}</h3>
          <h4>...</h4>
          <p>
            {t('如果需要，这里可以放一些关于产品的常见问题说明。')}
          </p>
        </div>
      </Fragment>
    );
  }
}

export default connect(({ allDictionaries, ldap }) => ({
  ldap,
  businessUnits: map(groupBy(allDictionaries.data, 'category').businessUnit, v =>v.data),
  projectNames: map(groupBy(allDictionaries.data, 'category').projectName, v =>v.data),
  locationBuildings: map(groupBy(allDictionaries.data, 'category').locationBuilding, v =>v.data),
  locationFloors: map(groupBy(allDictionaries.data, 'category').locationFloor, v =>v.data),
}))(translate("translations")(Step1));

