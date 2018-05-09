import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  NavigationActions,
} from 'react-navigation';
import {
  Alert,
  Linking,
  View,
} from 'react-native';
import Barcode from 'react-native-smart-barcode';

class Scan extends Component {
  static navigationOptions = {
    title: '扫码',
  };
  constructor(props) {
    super(props);
    this.state = {
      busy: false,
    };
  }
  handleApplication(data) {
    if (data.startsWith('http')) {
      Linking.canOpenURL(data).then((supported) => {
        if (!supported) {
          console.log(`invalid url: ${data}`);
        } else {
          const { auth, auth: { user } } = this.props;
          const uri = `${data}?token=${user.token}`;
          return Linking.openURL(uri);
        }
      }).catch(err => console.error(err));
    } else {
      Alert.alert(`未知类型数据:${data}`);
    }
    //back
    this.props.dispatch(NavigationActions.back());
  }

  onBarcodeRead(e) {
    this.stopScan();
    if (this.state.busy) {
      return;
    } else {
      this.setState({
        busy: true,
      });
    }

    const barcode = e.nativeEvent.data.code;
    this.handleApplication(barcode);
  }

  startScan(e) {
    this.barCodeRef.startScan();
  }

  stopScan(e) {
    this.barCodeRef.stopScan();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Barcode
          style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
          ref={component => this.barCodeRef = component}
          onBarCodeRead={e => this.onBarcodeRead(e)}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Scan);
