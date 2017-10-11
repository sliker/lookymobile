import React, { Component } from 'react';
import {
  View,
  StatusBar,
} from 'react-native';

import I18n from '../../i18n/i18n';

import Button from '../Common/Button/Button';
import TextInputField from '../Common/TextInputField/TextInputField';

import styles from './LoginFormStyles';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: 'dd',
      password: '',
    };

    this.onLogin = this.onLogin.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  onLogin() {
    const { email, password } = this.state;
    console.log('-- onLogin --', this.inputPassword.value);
    this.props.onLogin(email, this.inputPassword.value);
  }

  handleInputChange() {
  }

  render() {
    return (
      <View style={styles.loginFormContainer}>
        <StatusBar
          barStyle="default"
        />

        <TextInputField
          label={I18n.t('forms.label.email')}
          inputProps={{
            autoCapitalize: "none",
            autoCorrect: false,
            autoFocus: true,
            returnKeyType: "next",
            keyboardType: "email-address",
            onSubmitEditing: () => {
              this.inputPassword.focus()
            },
            onChangeText: this.handleInputChange,
          }}
        />

        <TextInputField
          style={{ marginBottom: 20 }}
          label={I18n.t('forms.label.password')}
          inputRef={input => this.inputPassword = input}
          inputProps={{
            secureTextEntry: true,
            returnKeyType: "go",
            onChangeText: this.handleInputChange,
          }}
        />

        <Button
          onPressButton={this.onLogin}
        >
          {I18n.t('forms.buttons.signIn')}
        </Button>

        <Button
          type="flat"
        >
          {I18n.t('forms.buttons.rememberPassword')}
        </Button>
      </View>
    );
  }
}

export default LoginForm;
