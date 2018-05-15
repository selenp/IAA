import React, { Component } from 'react';
import { connect } from 'react-redux';

import { NavigationActions } from 'react-navigation';

import {
  ActivityIndicator,
  Text,
  ScrollView,
} from 'react-native';
import {
  Button,
  Icon,
  List,
  Toast,
  WhiteSpace,
  WingBlank,
} from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

import {
  fetchUsers,
} from '../actions/user';

class UsersScreen extends Component {
  static navigationOptions = {
    title: '用户管理',
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchUsers('delete_flag=false');
  }
  render() {
    const {list, loading } = this.props.users;
    return (
      <List className="my-list">
        { loading &&
          <ActivityIndicator />
          }
          {
            list && list.map(item => (
              <Item
                key={item._id}
                multipleLine
                arrow="horizontal"
                onClick={(e) => {
                  this.props.userScreen({
                    _id: item._id,
                  })
                }}
                thumb={(<Icon size="md" color="#1296db" type={'\ue737'} />)}
                >
                {item.nickName}
                <Brief>{item.create_date}</Brief>
                </Item>
            ))
          }
      </List>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users,
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: criteria => dispatch(fetchUsers(criteria)),
  userScreen: params => dispatch(NavigationActions.navigate({ routeName: 'User', params })),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersScreen);
