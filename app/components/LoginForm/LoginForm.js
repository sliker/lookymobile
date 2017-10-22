import React, { Component } from 'react';
import {
  View,
  Text,
  Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';

import I18n from '../../i18n/i18n';

import Button from '../Common/Button/Button';
import TextInputField from '../Common/TextInputField/TextInputField';
import Toast from '../Common/Toast/Toast';

import styles from './styles';

const propTypes = {
  onLogin: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.bool,
};

const defaultProps = {
  loading: false,
  error: false,
};

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.onLogin = this.onLogin.bind(this);

    this.state = {
      // fields
      email: '',
      password: '',
      // errors
      emailError: false,
      passwordError: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      Keyboard.dismiss();
      this.toast.show(I18n.t('error.message.login_title'));
    }
  }

  onLogin() {
    const { onLogin } = this.props;
    const { email, password } = this.state;
    const emailTrim = email.trim();
    const passwordTrim = password.trim();

    if (!emailTrim || !passwordTrim) {
      this.setState({
        emailError: !emailTrim,
        passwordError: !passwordTrim,
      });
      return;
    }

    onLogin(emailTrim, passwordTrim);
  }

  render() {
    const { loading, error } = this.props;
    const { emailError, passwordError } = this.state;

    return (
      <View style={styles.loginFormContainer}>

        {error &&
          <Text>An error has occur. Please try again.</Text>
        }

        <TextInputField
          label={I18n.t('forms.label.email')}
          errorMessage={emailError ? I18n.t('error.input.required') : ''}
          inputProps={{
            autoCapitalize: "none",
            autoCorrect: false,
            autoFocus: true,
            returnKeyType: "next",
            keyboardType: "email-address",
            onSubmitEditing: () => {
              this.inputPassword.focus()
            },
            onChangeText: (text) => {
              this.setState({ email: text })
            },
          }}
        />

        <TextInputField
          style={{ marginBottom: 32 }}
          inputRef={input => this.inputPassword = input}
          label={I18n.t('forms.label.password')}
          errorMessage={passwordError ? I18n.t('error.input.required') : ''}
          inputProps={{
            secureTextEntry: true,
            returnKeyType: "go",
            onSubmitEditing: this.onLogin,
            onChangeText: (text) => {
              this.setState({ password: text })
            },
          }}
        />

        <Button
          onPressButton={this.onLogin}
          loading={loading}
        >
          {I18n.t('forms.buttons.signIn')}
        </Button>

        <Button
          type="flat"
          onPressButton={() => {
            console.log('recover password');
          }}
        >
          {I18n.t('forms.buttons.rememberPassword')}
        </Button>

        <Toast
          ref={(toast) => {
            this.toast = toast;
          }}
        />
      </View>
    );
  }
}

LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;

export default LoginForm;
