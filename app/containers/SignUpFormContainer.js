import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { initSignUpUserWithEmail } from '../actions/userActions';
import styles from './styles';

import SignUpForm from '../components/SignUpForm/SignUpForm';


const propTypes = {
  navigation: PropTypes.object.isRequired,
  loading: PropTypes.bool,
};

const defaultProps = {
  loading: false,
};

class SignUpFormContainer extends Component {
  constructor(props) {
    super(props);

    this.formSignUp = this.formSignUp.bind(this);
  }

  formSignUp(userData) {
    this.props.userActions.initSignUpUserWithEmail(userData);
  }

  render() {
    const { loading } = this.props;

    return (
      <KeyboardAwareScrollView
        style={styles.signUpFormContainer}
        resetScrollToCoords={{ x: 0, y: 0 }}
        extraScrollHeight={50}
      >

        <SignUpForm
          loading={loading}
          onFormSignUp={this.formSignUp}
        />

      </KeyboardAwareScrollView>
    );
  }
}

SignUpFormContainer.propTypes = propTypes;
SignUpFormContainer.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    loading: state.user.loading,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    userActions: bindActionCreators({
      initSignUpUserWithEmail,
    }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpFormContainer);
