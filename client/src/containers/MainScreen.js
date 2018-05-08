import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Text,
  ScrollView,
} from 'react-native';
import {
  List,
  Icon,
  WingBlank,
  WhiteSpace,
  Button,
} from 'antd-mobile';
const Item = List.Item;

const data = [{
  _id: 1,
  text: '1',
}, {
  _id: 2,
  text: '2',
}];
class MainScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return  (
      <List className="my-list">
        {
          data.map(item => (
            <Item
              key={item._id}
              arrow="horizontal"
              thumb={(<Icon size='md' color="#1296db" type={'\ue737'} />)}
              onClick={e => {}}
              >
              {item.text}
            </Item>
          ))
        }
      </List>
    );
  }
}

export default MainScreen;
