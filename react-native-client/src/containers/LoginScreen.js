import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Button,
  List,
  InputItem,
  WhiteSpace,
  Icon,
} from 'antd-mobile';

import {
  sendcode,
  verifycode,
} from '../actions/auth';

class LoginScreen extends Component {
  static navigationOptions = {
    title: '登录',
    headerLeft: null,
    gesturesEnabled: false,
  };

  state = {
    mobileError: false,
    mobile: '',
    codeError: false,
    code: '',
  }

  handleMobile = (value) =>{
    this.setState({
      mobileError: !(/1\d{10}$/).test(value),
    });
    console.log(value, !(/1\d{10}$/).test(value));
  }

  handleCode =(value) =>{
    this.setState({
      codeError: !(/\d{4}$/).test(value),
    });
  }

    onMobileErrorClick = () => {
    if (this.state.mobileError) {
      Toast.info('Please enter 11 digits');
    }
  }
    onCodeErrorClick = () => {
    if (this.state.codeError) {
      Toast.info('Please enter 4 digits');
    }
  }
  handleSendcode(e) {
    this.props.sendcode({
      mobile: '18624357886',
    });
  }
  handleVerifycode(e) {
    this.props.verifycode({
      mobile: '18624357886',
      code: '20180508',
    });
  }
  render() {
    const { loading, error } = this.props.auth;
    return (
        <List renderHeader={() => '登录'}>
          { loading &&
            <ActivityIndicator />
            }
          <InputItem
            type="digit"
            pattern="/^1\d{10}$/"
            error={this.state.mobileError}
            onErrorClick={this.onMobileErrorClick}
            onChange={this.handleMobile}
            placeholder="186 1234 1234"
          >手机号码</InputItem>
          <InputItem
            type="digit"
            pattern="[0-9]{4}"
            error={this.state.codeError}
            onErrorClick={this.onCodeErrorClick}
            placeholder="短信验证码"
            onChange={this.handleCode}
            >验证码</InputItem>
          <WhiteSpace/>
          <Button
            type="primary"
            onClick={e => this.handleVerifycode(e)}
            >登录</Button>
        </List>
    );
  }
}

LoginScreen.propTypes = {
  sendcode: PropTypes.func.isRequired,
  verifycode: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});
const mapDispatchToProps = (dispatch) => ({
  sendcode: info => dispatch(sendcode(info)),
  verifycode: info => dispatch(verifycode(info)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
