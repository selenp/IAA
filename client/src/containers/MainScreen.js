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
  fetchEquipments,
} from '../actions/equipment';

class MainScreen extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchEquipments('delete_flag=false');
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
