import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as counterActions from '../actions/counterActions';
import * as userActions from '../actions/userActions';

import LoginMain from '../components/LoginMain/LoginMain';


const propTypes = {
  navigation: PropTypes.object.isRequired,
};

class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.openLoginForm = this.openLoginForm.bind(this);
    this.openSignUpForm = this.openSignUpForm.bind(this);
  }

  openLoginForm() {
    this.props.navigation.navigate('LoginFormContainer');
  }

  openSignUpForm() {
    this.props.navigation.navigate('SignUpFormContainer');
  }

  render() {
    return (
      <LoginMain
        onSingInPress={this.openLoginForm}
        onSignUpPress={this.openSignUpForm}
      />
    );
  }
}

LoginContainer.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    counter: state.counter,
    user: state.user,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    counterActions: bindActionCreators(counterActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
