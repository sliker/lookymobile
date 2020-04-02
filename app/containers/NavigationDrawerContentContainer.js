import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NavigationDrawer from '../components/NavigationDrawer/NavigationDrawer';

import styles from './styles';

const propTypes = {
  profilePictureUrl: PropTypes.string,
  displayName: PropTypes.string,
  email: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
};

const defaultProps = {
  profilePictureUrl: '',
  displayName: '',
};

class NavigationDrawerContentContainer extends Component {
  constructor(props) {
    super(props);

    this.navigateToScreen = this.navigateToScreen.bind(this);
  }

  navigateToScreen(screen) {
    this.props.navigation.navigate(screen);
  }

  render() {
    const { profilePictureUrl, displayName, email } = this.props;

    return (
      <View style={styles.navigationDrawer}>
        <NavigationDrawer
          displayName={displayName}
          email={email}
          profilePictureUrl={profilePictureUrl}
          onNavigateToScreen={this.navigateToScreen}
        />
      </View>
    );
  }
}

NavigationDrawerContentContainer.propTypes = propTypes;
NavigationDrawerContentContainer.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    profilePictureUrl: state.getIn([ 'user', 'profile', 'profilePictureUrl']),
    displayName: state.getIn([ 'user', 'profile', 'displayName']),
    email: state.getIn([ 'user', 'email']),
  }
};

export default connect(mapStateToProps)(NavigationDrawerContentContainer);
