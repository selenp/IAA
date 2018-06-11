import React, { Fragment } from 'react';
import { connect } from 'dva';
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
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (this.props.ldap.data.uid !== nextProps.ldap.data.uid) {
      this.props.form.setFieldsValue({
        fullname: nextProps.ldap.data.cn,
      });
    }
  }
  handleSeachEid = (eid) => {
    this.props.dispatch({
      type: 'ldap/search',
      uid: eid,
    });
  }

  render() {
    const {
      form,
      dispatch,
      businessUnits,
      projectNames,
      locationBuildings,
      locationFloors,
    } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
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
          styles={styles}
          onValidateForm={onValidateForm}
          getFieldDecorator={getFieldDecorator}
          formItemLayout={formItemLayout}
          businessUnits={businessUnits}
          projectNames={projectNames}
          locationBuildings={locationBuildings}
          locationFloors={locationFloors}
          handleSeachEid={this.handleSeachEid}
        />
        <Divider style={{ margin: '40px 0 24px' }} />
        <div className={styles.desc}>
          <h3>说明</h3>
          <h4>...</h4>
          <p>
            如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </p>
        </div>
      </Fragment>
    );
  }
}

export default connect(({ dictionary, ldap }) => ({
  ldap,
  businessUnits: map(groupBy(dictionary.data, 'category').businessUnit, v =>v.data),
  projectNames: map(groupBy(dictionary.data, 'category').projectName, v =>v.data),
  locationBuildings: map(groupBy(dictionary.data, 'category').locationBuilding, v =>v.data),
  locationFloors: map(groupBy(dictionary.data, 'category').locationFloor, v =>v.data),
}))(Step1);
