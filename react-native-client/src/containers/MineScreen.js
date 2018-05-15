import React, { Component } from 'react';
import { connect } from 'react-redux';

import { NavigationActions } from 'react-navigation';
import {
  Text,
  ScrollView,
  Alert,
} from 'react-native';

import {
  Icon,
  WhiteSpace,
  List,
} from 'antd-mobile';

import { logout } from '../actions/auth';

const Item = List.Item;
const Brief = Item.Brief;

class MineScreen extends Component {
  handleLogout(e) {
    Alert.alert(
      'Equipment',
      '您确定要退出吗？',
      [
        { text: '取消', onPress: () => { } },
        { text: '确定', onPress: () => this.props.logout() },
      ],
    );
  }

  render() {
    return (
      <ScrollView>
        <WhiteSpace />
        <List className="my-list">
          <Item
            arrow="horizontal"
            thumb={(<Icon size="lg" color="#1296db" type={'\ue716'} />)}
            multipleLine
            onClick={() => {}}
          >
            赵磊 <Brief>super_admin</Brief>
          </Item>
        </List>
        <WhiteSpace />
        <List className="my-list">
          <Item
            arrow="horizontal"
            thumb={(<Icon size="md" color="#1296db" type={'\ue742'} />)}
            onClick={e => this.props.statisticScreen()}
          >
            数据统计
          </Item>
          <Item
            arrow="horizontal"
            thumb={(<Icon size="md" color="#1296db" type={'\ue745'} />)}
            onClick={e => this.props.usersScreen()}
          >
            用户管理
          </Item>
        </List>
        <WhiteSpace />
        <List className="my-list">
          <Item
            thumb={(<Icon size="md" color="#1296db" type={'\ue72d'} />)}
            extra="B050819"
          >
            版本
          </Item>
          <Item
            thumb={(<Icon size="md" color="#1296db" type={'\ue724'} />)}
            onClick={e => this.handleLogout(e)}
          >
            退出
          </Item>
        </List>
      </ScrollView>
    );
  }
}


const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  statisticScreen: params => dispatch(NavigationActions.navigate({ routeName: 'Statistics', params })),
  usersScreen: params => dispatch(NavigationActions.navigate({ routeName: 'Users', params })),
});

export default connect(mapStateToProps, mapDispatchToProps)(MineScreen);
