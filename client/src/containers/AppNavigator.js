import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  NavigationActions,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';

import {
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';

import {
  Icon,
  WingBlank,
} from 'antd-mobile';

import EquipmentScreen from '../containers/EquipmentScreen';
import MainScreen from '../containers/MainScreen';
import MineScreen from '../containers/MineScreen';
import LoginScreen from '../containers/LoginScreen';
import ScanScreen from '../containers/ScanScreen';
import UsersScreen from '../containers/UsersScreen';

import { addListener } from '../utils/redux';

import { tokenLogin } from '../actions/auth';

const MainScreenNavigator = createBottomTabNavigator({
  Home: {
    screen: MainScreen,
    path: '/main',
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: '主页',
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon size='lg' color={tintColor} type={'\ue750'} />
      ),
    }),
  },
  Mine: {
    screen: MineScreen,
    path: '/mine',
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: '我的',
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon size='lg' color={tintColor} type={'\ue6e2'} />
      ),
    }),
  },
}, {
  tabBarPosition: 'bottom',
});
MainScreenNavigator.navigationOptions = ({ navigation }) => {
  let title, headerRight;
  let focusedRouteName = navigation.state.routes[navigation.state.index].routeName;
  if (focusedRouteName === 'Home') {
    title = 'Home'; // of course in this case it's the same, but do whatever you want here
    headerRight = (
        <View style={{ flex: 1, flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Scan')}
          >
          <Icon size='md' color="#1296db" type={'\ue722'}/>
        </TouchableOpacity>
      <WingBlank>
        <TouchableOpacity
          onPress={() => navigation.navigate('Equipment')}
          >
          <Icon size='md' color="#1296db" type={'\ue738'}/>
        </TouchableOpacity>
      </WingBlank>
      </View>
    );
  } else if (focusedRouteName === 'Mine') {
    title = 'Mine';
  }

  return {
    title,
    headerRight,
  };
};

export const AppNavigator = createStackNavigator({
  Main: {
    screen: MainScreenNavigator,
  },
  Login: {
    screen: LoginScreen,
  },
  Equipment: {
    screen: EquipmentScreen,
  },
  Scan: {
    screen: ScanScreen,
  },
  Users: {
    screen: UsersScreen,
  },
});

class AppWithNavigationState extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
  };
  componentWillMount() {
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
    const { dispatch, nav, auth } = this.props;
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
  auth: state.auth,
});
const mapDispatchToProps = (dispatch, Ownprops) => ({
  dispatch,
  tokenLogin: info => dispatch(tokenLogin(info)),
  loginScreen: params => dispatch(NavigationActions.navigate({ routeName: 'Login', params })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppWithNavigationState);
