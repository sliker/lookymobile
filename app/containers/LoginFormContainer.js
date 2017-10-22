import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { initLoginWithEmail } from '../actions/userActions';

import LoginForm from '../components/LoginForm/LoginForm';

const propTypes = {
  navigation: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.bool,
};

const defaultProps = {
  loading: false,
  error: false,
};

class LoginFormContainer extends Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
  }

  login(email, password) {
    this.props.userActions.initLoginWithEmail(email, password);
  }

  render() {
    const { loading, error } = this.props;

    return (
      <LoginForm
        loading={loading}
        error={error}
        onLogin={this.login}
      />
    );
  }
}

LoginFormContainer.propTypes = propTypes;
LoginFormContainer.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    loading: state.user.loading,
    error: state.user.error,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    userActions: bindActionCreators({
      initLoginWithEmail,
    }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer);
