import React, { Component } from 'react';
import { Provider } from 'react-redux'

import * as firebase from 'firebase';

import { environment } from '../environment/environment';
import configureStore from './store/createStore';
import { LoginStack } from './router/router';

const store = configureStore({});

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    firebase.initializeApp(environment.firebase);
  }

  render() {
    return (
      <Provider store={store}>
        <LoginStack />
      </Provider>
    );
  }
}
