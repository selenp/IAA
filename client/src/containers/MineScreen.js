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

const Item = List.Item;
const Brief = Item.Brief;

import { logout } from '../actions/auth';

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
        <WhiteSpace/>
        <List className="my-list">
          <Item
            arrow="horizontal"
            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
            multipleLine
            onClick={() => {}}
            >
            赵磊 <Brief>super_admin</Brief>
          </Item>
        </List>
        <WhiteSpace/>
        <List className="my-list">
          <Item
            arrow="horizontal"
            thumb={(<Icon size='md' color="#1296db" type={'\ue742'} />)}
            onClick={e => this.handleLogout(e)}
            >
            数据统计
          </Item>
          <Item
            arrow="horizontal"
            thumb={(<Icon size='md' color="#1296db" type={'\ue745'} />)}
            onClick={e => this.handleLogout(e)}
            >
            用户管理
          </Item>
        </List>
        <WhiteSpace/>
        <List className="my-list">
          <Item
            thumb={(<Icon size='md' color="#1296db" type={'\ue72d'} />)}
             extra="B050819"
            >
            版本
          </Item>
          <Item
            arrow="horizontal"
            thumb={(<Icon size='md' color="#1296db" type={'\ue724'} />)}
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
  logout: () =>
    dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MineScreen);
