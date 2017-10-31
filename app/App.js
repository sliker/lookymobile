import React, { Component } from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux'

import * as firebase from 'firebase';

import { environment } from '../environment/environment';
import configureStore from './store/createStore';
import { LoginStack } from './router/router';

const store = configureStore({});

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.app = firebase.initializeApp(__DEV__ ? environment.firebase.dev : environment.firebase.prod);

    this.state = {
      isUserSignedIn: false,
    };
  }

  componentDidMount() {
    this.app.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isUserSignedIn: true,
        });
      } else {
        this.setState({
          isUserSignedIn: false,
        });
      }
    });
  }

  render() {
    const { isUserSignedIn } = this.state;
    const main = (isUserSignedIn) ? (
      <Text style={{ flex: 1, alignItems: 'center', alignSelf: 'center', justifyContent: 'center'}}>
        User signed in!
      </Text>
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
