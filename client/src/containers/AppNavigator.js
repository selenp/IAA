import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  NavigationActions,
  StackNavigator,
} from 'react-navigation';

import {
  AsyncStorage,
} from 'react-native';

import LoginScreen from '../containers/LoginScreen';
import MainScreen from '../containers/MainScreen';
import ProfileScreen from '../containers/ProfileScreen';
import { addListener } from '../utils/redux';

import { tokenLogin } from '../actions/auth';

export const AppNavigator = StackNavigator({
  Main: {
    screen: MainScreen,
  },
  Login: {
    screen: LoginScreen,
  },
  Profile: {
    screen: ProfileScreen,
  },
});

class AppWithNavigationState extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
  };
  componentDidMount() {
    this.doTokenLogin();
  }

  doTokenLogin() {
    // 每次打开页面时，做tokenLogin
    const { loginScreen, tokenLogin } = this.props;
    // load auth
    AsyncStorage.getItem('token').then((token) => {
      if (token) {
        tokenLogin(token);
      } else if (!this.checkIsLoginScreen()) {
        loginScreen();
      }
    });
  }

  checkIsLoginScreen() {
    return this.props.nav.routes[this.props.nav.routes.length - 1].routeName === 'Login';
  }

  render() {
    const { dispatch, nav } = this.props;
    return (
      <AppNavigator
        navigation={{
          dispatch,
          state: nav,
          addListener,
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});
const mapDispatchToProps = (dispatch, Ownprops) => ({
  dispatch,
  tokenLogin: info => dispatch(tokenLogin(info)),
  loginScreen: params => dispatch(NavigationActions.navigate({ routeName: 'Login', params })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppWithNavigationState);
