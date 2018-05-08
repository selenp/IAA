import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import AppReducer from './reducers';
import AppWithNavigationState from './navigators/AppNavigator';
import { middleware } from './utils/redux';

import api from './middlewares/api';

const store = createStore(
  AppReducer,
  applyMiddleware(middleware, thunk, api),
);

class Equipment extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default Equipment;
