import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import I18n from '../../i18n/i18n';

import Button from '../Common/Button/Button';
import TextInputField from '../Common/TextInputField/TextInputField';


const propTypes = {
  loading: PropTypes.bool,
  onFormSignUp: PropTypes.func.isRequired,
};

const defaultProps = {
  loading: false,
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // fields
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      // errors
      firstNameError: '',
      emailError: '',
      passwordError: '',
    };

    this.inputPassword = null;
    this.inputLastName = null;
    this.inputEmail = null;
    this.onSignUp = this.onSignUp.bind(this);
  }

  onSignUp() {
    const { loading, onFormSignUp } = this.props;
    const { firstName, lastName, email, password } = this.state;

    if (loading) {
      return;
    }

    const userData = {
      firstName: firstName.trim(),
      lastName: lastName.trim() || '',
      email: email.trim(),
      password: password.trim(),
    };

    if (!userData.firstName || !userData.email || !userData.password) {
      this.setState({
        firstNameError: !userData.firstName,
        emailError: !userData.email,
        passwordError: !userData.password,
      });
      return;
    }

    onFormSignUp(userData);
  }

  render() {
    const { firstNameError, emailError, passwordError } = this.state;
    const { loading } = this.props;

    return (
      <View>
        <TextInputField
          label={I18n.t('forms.label.name')}
          errorMessage={firstNameError ? I18n.t('error.input.required') : ''}
          inputProps={{
            autoFocus: true,
            returnKeyType: "next",
            onSubmitEditing: () => {
              this.inputLastName.focus()
            },
            onChangeText: (text) => {
              this.setState({ firstName: text })
            },
          }}
        />

        <TextInputField
          inputRef={input => this.inputLastName = input}
          label={I18n.t('forms.label.lastName')}
          inputProps={{
            returnKeyType: "next",
            onSubmitEditing: () => {
              this.inputEmail.focus()
            },
            onChangeText: (text) => {
              this.setState({ lastName: text })
            },
          }}
        />

        <TextInputField
          inputRef={input => this.inputEmail = input}
          label={I18n.t('forms.label.email')}
          errorMessage={emailError ? I18n.t('error.input.required') : ''}
          inputProps={{
            autoCapitalize: "none",
            autoCorrect: false,
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
          style={{ marginBottom: 20 }}
          inputRef={input => this.inputPassword = input}
          label={I18n.t('forms.label.password')}
          errorMessage={passwordError ? I18n.t('error.input.required') : ''}
          inputProps={{
            secureTextEntry: true,
            returnKeyType: "go",
            onSubmitEditing: this.onSignUp,
            onChangeText: (text) => {
              this.setState({ password: text })
            },
          }}
        />

        <Button
          onPressButton={this.onSignUp}
          loading={loading}
        >
          {I18n.t('forms.buttons.signUp')}
        </Button>
      </View>
    );
  }
}

SignUpForm.propTypes = propTypes;
SignUpForm.defaultProps = defaultProps;

export default SignUpForm;
