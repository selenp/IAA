import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Icon } from 'antd-mobile';

import {
  sendcode,
  verifycode,
} from '../actions/auth';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

class LoginScreen extends Component {
  static navigationOptions = {
    title: '登录',
    headerLeft: null,
    gesturesEnabled: false,
  };


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
    return (
      <View style={styles.container}>
        <Button
          onPress={e => this.handleSendcode(e)}
          title="Send Code"
          />
          <Button
            onPress={e => this.handleVerifycode(e)}
            title="Verify Code"
            />
      </View>
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
