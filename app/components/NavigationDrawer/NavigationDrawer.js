import React, { Component } from 'react';
import {
  View,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import TextRoboto from '../Common/TextRoboto/TextRoboto';
import NotificationDrawerItem from './NotificationDrawerItem/NotificationDrawerItem';

const propTypes = {
  profilePictureUrl: PropTypes.string,
  displayName: PropTypes.string,
  email: PropTypes.string.isRequired,
  onNavigateToScreen: PropTypes.func.isRequired,
};

const defaultProps = {
  profilePictureUrl: '',
  displayName: '',
};

class NavigationDrawer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { email, displayName, profilePictureUrl, onNavigateToScreen } = this.props;
    const image = profilePictureUrl ? {uri: profilePictureUrl} : require('../../../assets/images/default_profile_picture.png');

    const items = [
      {
        icon: require('../../../assets/images/icons/ic_pets_white.png'),
        title: 'My reports',
        screen:'MyReports',
      },
      {
        icon: require('../../../assets/images/icons/ic_message_white.png'),
        title: 'Messages',
        screen: 'Messages',
      },
      {
        icon: require('../../../assets/images/icons/ic_settings_white.png'),
        title: 'Settings',
        screen: 'Settings',
      }
    ];

    return (
      <View>
        <View style={styles.profileDataContainer}>
          <Image
            style={styles.profilePicture}
            source={image}
          />
          <TextRoboto style={styles.displayName}>
            { displayName }
          </TextRoboto>
          <TextRoboto style={styles.email}>
            { email }
          </TextRoboto>
        </View>

        {items.map((item, index) => {
          return (
            <NotificationDrawerItem
              key={`navigation-drawer-${index}`}
              item={item}
              onNavigateToScreen={onNavigateToScreen}
            />
          );
        })}
      </View>
    );
  }
}

NavigationDrawer.propTypes = propTypes;
NavigationDrawer.defaultProps = defaultProps;

export default NavigationDrawer;
