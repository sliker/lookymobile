import React, { Component } from 'react';
import { Provider } from 'react-redux'

import * as firebase from 'firebase';

import { environment } from '../environment/environment';
import configureStore from './store/createStore';
import { LoginStack, MainStack } from './router/router';
import { initSetDataAlreadyLogin } from './actions/userActions';

const store = configureStore({});

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.firebaseApp = firebase.initializeApp(__DEV__ ? environment.dev.firebase : environment.prod.firebase);

    this.state = {
      isUserSignedIn: false,
      loadingUserAuth: true,
    };
  }

  componentWillMount() {
    // observe for auth state changes
    this.firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isUserSignedIn: true,
          loadingUserAuth: false,
        });
        store.dispatch(initSetDataAlreadyLogin(user));
      } else {
        this.setState({
          isUserSignedIn: false,
          loadingUserAuth: false,
        });
      }
    });
  }

  render() {
    const { isUserSignedIn, loadingUserAuth } = this.state;

    if (loadingUserAuth) {
      // TODO: render splash screen
      return null;
    }

    const main = (isUserSignedIn) ? (
      <MainStack />
    ) : (
      <LoginStack />
    );

    return (
      <Provider store={store}>
        {main}
      </Provider>
    );
  }
}
