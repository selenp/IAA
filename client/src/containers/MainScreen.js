import React, { Component } from 'react';
import { connect } from 'react-redux';

import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

class MainScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

MainScreen.navigationOptions = {
  title: 'Home Screen',
};

export default MainScreen;
