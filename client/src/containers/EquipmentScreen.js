import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  ScrollView,
} from 'react-native';
import {
  Button,
  DatePicker,
  Icon,
  ImagePicker,
  InputItem,
  List,
  Picker,
  Steps,
  TextareaItem,
  WhiteSpace,
  WingBlank,
} from 'antd-mobile';

const Step = Steps.Step;

import arrayTreeFilter from 'array-tree-filter';
import  district from './district';

import { modifyEquipment, resetModifyEquipment } from '../actions/equipment';
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

class EquipmentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      multiple: false,
       data: [],
    cols: 1,
    pickerValue: [],
    asyncValue: [],
    visible: false,
    };
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

  reset() {
    this.props.resetModifyEquipment();
  }

  render() {
    const { files } = this.state;
    console.log(district);
    return (
      <ScrollView>
        <WhiteSpace/>
            <Steps>
              <Step status="finish" title="Step 1" icon={<Icon size='md' color="#1296db" type={'\ue72d'} />} />
              <Step status="error" title="Step 2" icon={<Icon size='md' color="#f00" type={'\ue72d'} />} />
              <Step status="process" title="Step 3" icon={<Icon size='md' color="#555" type={'\ue7db'} />} />
            </Steps>
        <List>
          <InputItem
            clear
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
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  modifyEquipment: info => dispatch(modifyEquipment(info)),
  resetModifyEquipment: () => dispatch(resetModifyEquipment()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentScreen);
