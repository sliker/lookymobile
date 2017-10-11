import React, { Component } from 'react';

import I18n from '../i18n/i18n';

import LoginMain from '../components/LoginMain/LoginMain';
import LoginForm from '../components/LoginForm/LoginForm';

class Login extends Component {
  constructor(props) {
    super(props);

    this.openLoginForm = this.openLoginForm.bind(this);
    this.emailLogin = this.emailLogin.bind(this);
  }

  openLoginForm() {
    this.props.navigator.push({
      component: LoginForm,
      title: I18n.t('section.title.login'),
      navigationBarHidden: false,
      passProps: {
        onLogin: this.emailLogin
      }
    });
  }

  emailLogin(email, password) {
    if (!email || !password) {
      console.log('email and password are required');
      // TODO: show form errors
      return;
    }

    console.log('user try to login: ', email, password);
  }

  render() {
    return (
      <LoginMain
        onSingInPress={this.openLoginForm}
      />
    );
  }
}

export default Login;
