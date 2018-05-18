import React, { Fragment } from 'react';
import { connect } from 'dva';
import {
  Form,
  Divider,
} from 'antd';
import { routerRedux } from 'dva/router';
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
      type: 'io/fetchDictionaryData',
    });
  }
  render() {
    const { form, dispatch, businessUnits, projectNames } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'io/saveData',
            payload: values,
          });
          dispatch(routerRedux.push('/io/borrow/confirm'));
        }
      });
    };
    const onITStaffForm = () => {
          dispatch({
            type: 'io/saveData',
            payload: {
              eid: '',
              fullname: 'IT Staff',
              sapNumber: '',
              projectName: '',
              businessUnit: '',
              location: '',
              remarks: '',
            },
          });
          dispatch(routerRedux.push('/io/borrow/confirm'));
    };
    // TODO
    return (
      <Fragment>
        <InfoForm
          styles={styles}
          onValidateForm={onValidateForm}
          onITStaffForm={onITStaffForm}
          getFieldDecorator={getFieldDecorator}
          formItemLayout={formItemLayout}
          businessUnits={businessUnits}
          projectNames={projectNames}
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

export default connect(({ io }) => ({
  businessUnits: io.businessUnits,
  projectNames: io.projectNames,
}))(Step1);
