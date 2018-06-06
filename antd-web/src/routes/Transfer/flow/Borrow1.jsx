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
const getQuery = (location, param) => {
    let v = null
    if (location.search && location.search.startsWith('?')) {
      v = location.search.split(/[\?#&]/).reduce((s, c) => { const t = c.split('='); s[t[0]] = t[1]; return s; }, {})[param];
      if (v)
        v=decodeURIComponent(v);
    }
    return v;
};

@Form.create()
class Step1 extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {dispatch, location} = this.props;

    // search string
    const taskId = getQuery(location, 'task');
    if (taskId) {
      dispatch({
        type: 'task/fetch',
        id: taskId,
      });
    }

    dispatch({
      type: 'transfer/initData',
      payload: {
        taskId,
      },
    });
  }
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'task/initData',
    });
  }

  render() {
    const { form, dispatch, currentUser, task } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
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
          styles={styles}
          onValidateForm={onValidateForm}
          getFieldDecorator={getFieldDecorator}
          formItemLayout={formItemLayout}
          currentUser={currentUser}
        />
        <Divider style={{ margin: '40px 0 24px' }} />
        {
          task && task.eid && (
          <div className={styles.desc}>
            <h3>说明</h3>
            <h4>{`${task.eid}: ${task.category}`}</h4>
            <pre>{task.content}</pre>
          </div>
          )
        }
      </Fragment>
    );
  }
}

export default connect(({ user, task }) => ({
  currentUser: user.currentUser,
  task: task.data,
}))(Step1);
