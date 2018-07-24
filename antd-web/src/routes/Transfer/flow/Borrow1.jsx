import React, { Fragment } from 'react';
import { translate } from "react-i18next";
import { connect } from 'dva';
import { Form, Divider } from 'antd';
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
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'task/initData',
    });
    dispatch({
      type: 'ldap2/initData',
    });
  }
  handleSeachEid1 = (eid) => {
    if (eid) {
      this.props.dispatch({
        type: 'ldap2/search1',
        uid: eid,
      });
    }
  }
  handleSeachEid2 = (eid) => {
    if (eid) {
      this.props.dispatch({
        type: 'ldap2/search2',
        uid: eid,
      });
    }
  }
  handleInitLdap1 = () => {
    this.props.dispatch({
      type: 'ldap2/initData1',
    });
  }
  handleInitLdap2 = () => {
    this.props.dispatch({
      type: 'ldap2/initData2',
    });
  }

  render() {
    const { t } = this.props;
    const { form, data, dispatch, currentUser, task, ldap2 } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      if (!ldap2.data1.cn || !ldap2.data2.cn) {
        return;
      }
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'transfer/saveData',
            payload: values,
          });
          dispatch(routerRedux.push('/transfer/borrow/confirm'));
        }
      });
    };
    // TODO
    return (
      <Fragment>
        <InfoForm
          task={task}
          ldap2={ldap2}
          styles={styles}
          data={data}
          onValidateForm={onValidateForm}
          getFieldDecorator={getFieldDecorator}
          formItemLayout={formItemLayout}
          currentUser={currentUser}
          handleSeachEid1={this.handleSeachEid1}
          handleSeachEid2={this.handleSeachEid2}
          handleInitLdap1={this.handleInitLdap1}
          handleInitLdap2={this.handleInitLdap2}
        />
        <Divider style={{ margin: '40px 0 24px' }} />
        {task &&
          task.eid && (
            <div className={styles.desc}>
              <h3>{t('说明')}</h3>
              <h4>{`${task.eid}: ${task.category}`}</h4>
              <pre>{task.content}</pre>
            </div>
          )}
      </Fragment>
    );
  }
}

export default connect(({ transfer, user, task, ldap2 }) => ({
  data: transfer.step,
  ldap2,
  currentUser: user.currentUser,
  task: task.data,
}))(translate("translations")(Step1));
