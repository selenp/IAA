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

import LoginScreen from '../components/LoginScreen';
import MainScreen from '../components/MainScreen';
import ProfileScreen from '../components/ProfileScreen';
import { addListener } from '../utils/redux';

import { tokenLogin, initialUser } from '../actions/auth';

export const AppNavigator = StackNavigator({
  Main: { screen: MainScreen },
  Login: { screen: LoginScreen },
  Profile: { screen: ProfileScreen },
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
    const { loginScreen, tokenLogin, initialUser } = this.props;
    // load auth
    AsyncStorage.getItem('user').then((data) => {
      if (data) {
        const user = JSON.parse(data);
        initialUser(user);
        const { token } = user;
        tokenLogin({
          token,
        });
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
  initialUser: user => dispatch(initialUser(user)),
  loginScreen: params => dispatch(NavigationActions.navigate({ routeName: 'Login', params })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppWithNavigationState);
