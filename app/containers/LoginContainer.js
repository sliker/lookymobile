import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { initSocialLogin } from '../actions/userActions';
import I18n from '../i18n/i18n';

import LoginMain from '../components/LoginMain/LoginMain';
import ModalLoading from '../components/Common/ModalLoading/ModalLoading';
import Toast from '../components/Common/Toast/Toast';


const propTypes = {
  navigation: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.bool,
};

const defaultProps = {
  loading: false,
  error: false,
};

class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.openLoginForm = this.openLoginForm.bind(this);
    this.openSignUpForm = this.openSignUpForm.bind(this);
    this.socialSignIn = this.socialSignIn.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.toast.show(I18n.t('error.message.global'));
    }
  }

  openLoginForm() {
    this.props.navigation.navigate('LoginFormContainer');
  }

  openSignUpForm() {
    this.props.navigation.navigate('SignUpFormContainer');
  }

  socialSignIn(provider) {
    this.props.userActions.initSocialLogin(provider);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <LoginMain
          onSingInPress={this.openLoginForm}
          onSignUpPress={this.openSignUpForm}
          onSocialSignIn={this.socialSignIn}
        />

        {this.props.loading &&
          <ModalLoading />
        }

        <Toast
          ref={(toast) => {
            this.toast = toast;
          }}
        />
      </View>
    );
  }
}

LoginContainer.propTypes = propTypes;
LoginContainer.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    loading: state.user.loading,
    error: state.user.error,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    userActions: bindActionCreators({
      initSocialLogin,
    }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
