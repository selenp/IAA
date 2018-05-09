import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import {
  Button,
  DatePicker,
  Icon,
  ImagePicker,
  InputItem,
  Toast,
  List,
  Picker,
  Steps,
  NoticeBar,
  TextareaItem,
  WhiteSpace,
  WingBlank,
} from 'antd-mobile';
import { EventRegister } from 'react-native-event-listeners';

const Step = Steps.Step;

import arrayTreeFilter from 'array-tree-filter';
import  district from '../data/district';
import { MODIFY_EQUIPMENT_SUCCESS } from '../constants/equipment';

import {
  fetchEquipment,
  modifyEquipment,
  resetModifyEquipment,
} from '../actions/equipment';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

class EquipmentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject:'',
      abstract:'',
      equipment: {},
      files: [],
      multiple: false,
      data: [],
      cols: 1,
      pickerValue: [],
      asyncValue: [],
      visible: false,
      toastTimer: null,
    };
  }
  componentDidMount() {
    const _id = this.props.navigation.getParam('_id');
    if (_id) {
      this.props.fetchEquipment(_id);
    }
  }
  componentWillUnmount() {
     this.state.toastTimer && clearTimeout(this.state.toastTimer);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('nextProps', nextProps);
    if ((nextProps.equipment.data && !this.props.equipment.data) || nextProps.equipment.just_saved) {
      this.setState({
        ...this.state,
        ...nextProps.equipment.data,
      }, () => {
        this.forceUpdate();
      });
      return true;
    }

    return false;
  }

  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      subject: '',
      abstract: '',
      date: now,
      files,
    });
  }
  getSel() {
    const value = this.state.pickerValue;
    if (!value) {
      return '';
    }
    const treeChildren = arrayTreeFilter(district, (c, level) => c.value === value[level]);
    return treeChildren.map(v => v.label).join(',');
  }
  handleModifyEquipment(e) {
    this.props.modifyEquipment(this.state);
  }

  delayReset() {
    Toast.success('已经保存,', 2);

    this.state.toastTimer = setTimeout(() => {
      this.props.resetModifyEquipment();

      // go back
      this.props.dispatch(NavigationActions.back());

      EventRegister.emit(MODIFY_EQUIPMENT_SUCCESS)
    }, 2000);
  }

  render() {
    const { error, loading, saving, just_saved } = this.props.equipment;
    const { files } = this.state;
    if (just_saved) {
      this.delayReset();
    }

    return (
      <ScrollView>
        { loading &&
          <ActivityIndicator />
        }
        <NoticeBar mode="closable" icon={<Icon type={'\ue71b'} size="xxs" />}>
          您好。。。。。。
        </NoticeBar>
        <WhiteSpace/>
        <Steps>
          <Step status="finish" title="Step 1" icon={<Icon size='md' color="#1296db" type={'\ue72d'} />} />
          <Step status="error" title="Step 2" icon={<Icon size='md' color="#f00" type={'\ue72d'} />} />
          <Step status="process" title="Step 3" icon={<Icon size='md' color="#555" type={'\ue7db'} />} />
        </Steps>
        <List>
          <InputItem
            clear
            defaultValue={this.state.subject}
            placeholder="请填写设备名称"
            ref={el => this.autoFocusInst = el}
            onChange={(text) => {
              this.setState({
                subject: text,
              });
            }}
            >标题</InputItem>
          <DatePicker
            value={this.state.date}
            onChange={date => this.setState({ date })}
            >
            <List.Item arrow="horizontal">创建时间</List.Item>
          </DatePicker>
          <Picker
            visible={this.state.visible}
            data={district}
            value={this.state.pickerValue}
            onChange={v => this.setState({ pickerValue: v })}
            onOk={() => this.setState({ visible: false })}
            onDismiss={() => this.setState({ visible: false })}
            >
            <List.Item extra={this.getSel()} onClick={() => this.setState({ visible: true })}>
              地址
            </List.Item>
          </Picker>
        </List>
        <List renderHeader={() => '拍照'}>
          <ImagePicker
            files={files}
            onChange={this.onChange}
            onImageClick={(index, fs) => console.log(index, fs)}
            multiple={this.state.multiple}
            selectable={files.length < 5}
                                       />
        </List>
        <List renderHeader={() => '简介'}>
          <TextareaItem
            rows={5}
            count={100}
            defaultValue={this.state.abstract}
            onChange={(text) => {
              this.setState({
                abstract: text,
              });
            }}
            />
        </List>
        <WhiteSpace/>
        <Button
          type="primary"
          onClick={e => this.handleModifyEquipment(e)}
          >保存</Button>
        <WhiteSpace />
      </ScrollView>
    );
  }
}

EquipmentScreen.navigationOptions = {
  title: '设备管理',
};

const mapStateToProps = state => ({
  auth: state.auth,
  equipment: state.equipment,
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatch,
  modifyEquipment: info => dispatch(modifyEquipment(info)),
  resetModifyEquipment: () => dispatch(resetModifyEquipment()),
  fetchEquipment: _id => dispatch(fetchEquipment(_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentScreen);
