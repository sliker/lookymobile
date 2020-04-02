import React, { Component } from 'react';
import {
  View,
  Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';

import I18n from '../../i18n/i18n';

import Button from '../Common/Button/Button';
import TextInputField from '../Common/TextInputField/TextInputField';
import AlertDialog from '../Common/AlertDialog/AlertDialog';

import styles from './styles';

const propTypes = {
  onLogin: PropTypes.func.isRequired,
  onRecoverEmail: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  recoverPassword: PropTypes.object,
};

const defaultProps = {
  loading: false,
  error: false,
  recoverPassword: {
    error: false,
    success: false,
  },
};

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.onLogin = this.onLogin.bind(this);
    this.onRecoverEmailSubmit = this.onRecoverEmailSubmit.bind(this);
    this.resetRecoverEmail = this.resetRecoverEmail.bind(this);

    this.state = {
      // fields
      email: '',
      password: '',
      emailRecover: '',
      // errors
      emailError: false,
      passwordError: false,
      emailRecoverError: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error || nextProps.recoverPassword.get('error') || nextProps.recoverPassword.get('success')) {
      // TODO: Fix position of Toast or see how to hide keyboard when focus after recover password alert dismissed
      Keyboard.dismiss();
    }
  }

  onLogin() {
    const { onLogin } = this.props;
    const { email, password } = this.state;
    const emailTrim = email.trim();
    const passwordTrim = password.trim();

    if (!emailTrim || !passwordTrim) {
      // TODO: Add Firebase errors code explanation
      this.setState({
        emailError: !emailTrim,
        passwordError: !passwordTrim,
      });
      return;
    }

    onLogin(emailTrim, passwordTrim);
  }

  onRecoverEmailSubmit() {
    const recoverEmailTrim = this.state.emailRecover.trim();

    if (!recoverEmailTrim) {
      this.setState({
        emailRecoverError: true,
      });

      return;
    }

    this.props.onRecoverEmail(recoverEmailTrim);
    this.recoverPasswordDialog.dismiss();
  }

  resetRecoverEmail() {
    this.setState({
      emailRecover: '',
      emailRecoverError: false,
    });
  }

  render() {
    const { loading } = this.props;
    const { emailError, passwordError, emailRecoverError } = this.state;

    return (
      <View style={styles.loginFormContainer}>

        <AlertDialog
          ref={(dialog) => {
            this.recoverPasswordDialog = dialog;
          }}
          title={I18n.t('forms.buttons.rememberPassword')}
          positiveText={I18n.t('forms.buttons.recovery')}
          onPositivePress={this.onRecoverEmailSubmit}
          onDismiss={this.resetRecoverEmail}
        >
          <TextInputField
            style={{ marginBottom: 0, height: 'auto' }}
            placeholder={I18n.t('forms.label.email')}
            errorMessage={emailRecoverError ? I18n.t('error.input.required') : ''}
            inputProps={{
              autoCapitalize: "none",
              autoCorrect: false,
              autoFocus: true,
              returnKeyType: "go",
              keyboardType: "email-address",
              onSubmitEditing: this.onRecoverEmailSubmit,
              onChangeText: (text) => {
                this.setState({ emailRecover: text })
              },
            }}
          />
        </AlertDialog>

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
            this.recoverPasswordDialog.show();
          }}
        >
          {I18n.t('forms.buttons.rememberPassword')}
        </Button>

      </View>
    );
  }
}

LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;

export default LoginForm;
