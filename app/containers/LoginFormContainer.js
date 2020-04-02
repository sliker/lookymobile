import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { initLoginWithEmail, initRecoverPassword, recoverPasswordReset } from '../data/user/userActions';
import I18n from '../i18n/i18n';

import LoginForm from '../components/LoginForm/LoginForm';
import Toast from '../components/Common/Toast/Toast';

const propTypes = {
  navigation: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  recoverPassword: PropTypes.object,
};

const defaultProps = {
  loading: false,
  error: false,
  recoverPassword: {
    success: false,
    error: false,
  }
};

class LoginFormContainer extends Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.recoverEmail = this.recoverEmail.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.toast.show(I18n.t('error.message.login_title'));
    }

    if (nextProps.recoverPassword.get('success')) {
      this.toast.show(I18n.t('success.message.recovery'));
      this.props.userActions.recoverPasswordReset();
    } else if (nextProps.recoverPassword.get('error')) {
      this.toast.show(I18n.t('error.message.global'));
      this.props.userActions.recoverPasswordReset();
    }
  }

  login(email, password) {
    this.props.userActions.initLoginWithEmail(email, password);
  }

  recoverEmail(email) {
    this.props.userActions.initRecoverPassword(email);
  }

  render() {
    const { loading, error, recoverPassword } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <LoginForm
          loading={loading}
          error={error}
          recoverPassword={recoverPassword}
          onLogin={this.login}
          onRecoverEmail={this.recoverEmail}
        />

        <Toast
          ref={(toast) => {
            this.toast = toast;
          }}
        />
      </View>
    );
  }
}

LoginFormContainer.propTypes = propTypes;
LoginFormContainer.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    loading: state.get('user').loading,
    error: state.get('user').error,
    recoverPassword: state.get('user').recoverPassword,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    userActions: bindActionCreators({
      initLoginWithEmail,
      initRecoverPassword,
      recoverPasswordReset,
    }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer);
