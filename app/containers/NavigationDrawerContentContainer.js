import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { initSignOut } from '../actions/userActions';

import NavigationDrawer from '../components/NavigationDrawer/NavigationDrawer';

import styles from './styles';

const propTypes = {
  profilePictureUrl: PropTypes.string,
  displayName: PropTypes.string,
  email: PropTypes.string.isRequired,
};

const defaultProps = {
  profilePictureUrl: '',
  displayName: '',
};

class NavigationDrawerContentContainer extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.userActions.initSignOut();
  }

  render() {
    const { profilePictureUrl, displayName, email } = this.props;

    return (
      <View style={styles.navigationDrawer}>
        <NavigationDrawer
          displayName={displayName}
          email={email}
          profilePictureUrl={profilePictureUrl}
          onLogout={this.logout}
        />
      </View>
    );
  }
}

NavigationDrawerContentContainer.propTypes = propTypes;
NavigationDrawerContentContainer.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    profilePictureUrl: state.user.profile.profilePictureUrl,
    displayName: state.user.profile.displayName,
    email: state.user.email,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    userActions: bindActionCreators({
      initSignOut,
    }, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationDrawerContentContainer);
