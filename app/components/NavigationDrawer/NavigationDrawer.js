import React, { Component } from 'react';
import {
  View,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import TextRoboto from '../Common/TextRoboto/TextRoboto';
import Button from '../Common/Button/Button';
import NotificationDrawerItem from './NotificationDrawerItem/NotificationDrawerItem';

const propTypes = {
  profilePictureUrl: PropTypes.string,
  displayName: PropTypes.string,
  email: PropTypes.string.isRequired,
};

const defaultProps = {
  profilePictureUrl: '',
  displayName: '',
};

class NavigationDrawer extends Component {
  render() {
    const { email, displayName, profilePictureUrl, onLogout } = this.props;
    const image = profilePictureUrl ? {uri: profilePictureUrl} : require('../../../assets/images/default_profile_picture.png');

    const items = [
      {
        icon: require('../../../assets/images/icons/ic_pets_white.png'),
        title: 'My reports',
      },
      {
        icon: require('../../../assets/images/icons/ic_message_white.png'),
        title: 'Messages',
      },
      {
        icon: require('../../../assets/images/icons/ic_settings_white.png'),
        title: 'Settings',
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
              title={item.title}
              icon={item.icon}
            />
          );
        })}

        <Button
          onPressButton={onLogout}
        >
          Logout
        </Button>
      </View>
    );
  }
}

NavigationDrawer.propTypes = propTypes;
NavigationDrawer.defaultProps = defaultProps;

export default NavigationDrawer;
