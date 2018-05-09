import React, { Component } from 'react';
import { connect } from 'react-redux';

import { NavigationActions } from 'react-navigation';
import { EventRegister } from 'react-native-event-listeners';

import {
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import {
  Icon,
  List,
} from 'antd-mobile';

import { VERIFYCODE_SUCCESS } from '../constants/auth';
import { MODIFY_EQUIPMENT_SUCCESS } from '../constants/equipment';

import {
  fetchEquipments,
} from '../actions/equipment';

const Item = List.Item;
const Brief = Item.Brief;

class MainScreen extends Component {
  componentWillMount() {
    const refreshData =  (data) => {
      this.props.fetchEquipments('delete_flag=false');
    };

    this.listener1 = EventRegister.addEventListener(VERIFYCODE_SUCCESS, refreshData);
    this.listener2 = EventRegister.addEventListener(MODIFY_EQUIPMENT_SUCCESS, refreshData);
  }

  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token) {
        this.props.fetchEquipments('delete_flag=false');
      }
    });
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener2);
    EventRegister.removeEventListener(this.listener2);
  }
  render() {
    const {list, loading } = this.props.equipments;
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
                  this.props.equipmentScreen({
                    _id: item._id,
                  })
                }}
                thumb={(<Icon size="md" color="#1296db" type={'\ue737'} />)}
                >
                {item.subject}
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
  equipments: state.equipments,
});

const mapDispatchToProps = dispatch => ({
  fetchEquipments: criteria => dispatch(fetchEquipments(criteria)),
  equipmentScreen: params => dispatch(NavigationActions.navigate({ routeName: 'Equipment', params })),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
